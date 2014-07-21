#include"daddy.h"
#include"targetssettings.h"
#include<QTime>
#include<QDebug>

Daddy::Daddy(QWidget *parent) : QGLWidget(QGLFormat(QGL::SampleBuffers),parent)
{
    qsrand(QTime(0u,0u,0u).secsTo(QTime::currentTime()));
    Color=QColor(236u,182u,67u);
    //Переведём все используемые градусы в радианы
    GenerationRadians();
    circle.clear();
    Points p;
    for(Points*i=radians,*end=radians+ROUND_DEGREE;i<end;i+=CIRCLE_CLEARANCE) //Получаем координаты для отрисовки фона индикатора
    {
        p.x=i->x;
        p.y=i->y;
        p.angle=i->angle;
        circle.append(p);
    }
    ChangeFPS(.0f);
}

Daddy::~Daddy()
{
    if(IsActive())
        killTimer(timer.timerId());
}

/**
 * Увеличение индикатора
 */
void Daddy::mouseDoubleClickEvent(QMouseEvent  *event)
{
    if(parentWidget()->isFullScreen())
        parentWidget()->eventFilter(this,event);
    else if(parent()->isWidgetType() && parentWidget()->parent()->inherits("QMainWindow"))
        parentWidget()->parent()->eventFilter(this,event);
}

void Daddy::timerEvent(QTimerEvent *event)
{
    if(timer.timerId()==event->timerId())
        ContinueSearch();
    QWidget::timerEvent(event);
}

void Daddy::initializeGL()
{
    qglClearColor(palette().background().color()); //Фон OpenGl-виджета
    glMatrixMode(GL_PROJECTION); //Устанавливаем матрицу
    glShadeModel(GL_SMOOTH);//GL_FLAT
    glBlendFunc(GL_SRC_ALPHA,GL_ONE_MINUS_SRC_ALPHA);
    glEnable(GL_POINT_SMOOTH);
    glEnable(GL_BLEND);
    glHint(GL_POINT_SMOOTH_HINT,GL_NICEST);
    //glEnable(GL_DEPTH_TEST);
}

void Daddy::resizeGL(int w,int h)
{
    glEnable(GL_MULTISAMPLE);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    glOrtho(.0f,.0f,.0f,1.0,1.0,-1.0f);
    if(w>h)
        glViewport(static_cast<GLint>(0u),static_cast<GLint>(0u),static_cast<GLint>(h),static_cast<GLint>(h));
    else
        glViewport(static_cast<GLint>(0u),static_cast<GLint>(0u),static_cast<GLint>(w),static_cast<GLint>(w));
    glMatrixMode(GL_MODELVIEW);
    width=w;
    height=h;
}

void Daddy::paintGL()
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // чистим буфер изображения и буфер глубины
    glLoadIdentity(); // загружаем матрицу
    glPushMatrix();
    glEnable(GL_MULTISAMPLE);
    glEnable(GL_BLEND);
    LocatorArea();
    qreal h=settings["offset"]["horizontal"].isNull() ? .0f : settings["offset"]["horizontal"].toDouble(),
          v=settings["offset"]["vertical"].isNull() ? .0f : settings["offset"]["vertical"].toDouble(),
          a=settings["scan"]["amplitude"].isNull() ? 1.0f : settings["scan"]["amplitude"].toDouble(),
          e=settings["scan"]["equality"].isNull() ? 1.0f : settings["scan"]["equality"].toDouble(),
          hamp=settings["amplitude"]["horizontal"].isNull() ? 1.0f : settings["amplitude"]["horizontal"].toDouble(),
          vamp=settings["amplitude"]["vertical"].isNull() ? 1.0f : settings["amplitude"]["vertical"].toDouble();
    glTranslatef(h,v,.0f);
    glScalef(a,a,1.0f);
    glScalef(1.0f,e,1.0f);
    glScalef(hamp,vamp,1.0f);
    DrawStation();
    InitLocatorGrid();
    DrawRange();
    DrawAzimuth();
    DrawRay();
    glEnable(GL_POINT_SMOOTH);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    DrawTrash();
    DrawTargets();
    if(settings["meteo"]["show"].toBool())
        DrawMeteo();
    if(settings["local_items"]["show"].toBool())
        DrawLocalItems();
    if(settings["active_noise_trash"]["show"].toBool())
        DrawActiveNoiseTrash();
    if(settings["active_answer_trash"]["show"].toBool())
        DrawActiveAnswerTrash();
    if(settings["active_insync_trash"]["show"].toBool())
        DrawActiveInSyncTrash();
    glPopMatrix();
    PostDraw();
}

bool Daddy::IsActive(void)const
{
    return timer.isActive();
}

void Daddy::GenerationRadians(void)
{
    radians=new Points[ROUND_DEGREE];
    for(quint16 i=0u;i<ROUND_DEGREE;i++)
    {
        radians[i].angle=GetRadianValue(i);
        radians[i].x=qFastCos(radians[i].angle);
        radians[i].y=qFastSin(radians[i].angle);
    }
}

void Daddy::LocatorArea(void)const
{
    qglColor(Qt::black);
    glLineWidth(2.0f);
    glBegin(GL_TRIANGLE_FAN);
        for(QVector<Points>::const_iterator it=circle.begin();it<circle.end();it++)
            glVertex2d(it->x,it->y);
    glEnd();
}

void Daddy::PostDraw(void)const
{
    qglColor(palette().background().color());
    glBegin(GL_TRIANGLE_FAN);
    glVertex2d(-1,1u);
    for(QVector<Points>::const_iterator it=circle.begin()+30;it<circle.begin()+60;it++)
        glVertex2d(it->x,it->y);
    glEnd();
    glBegin(GL_TRIANGLE_FAN);
    glVertex2d(1u,1u);
    for(QVector<Points>::const_iterator it=circle.begin();it<circle.begin()+30;it++)
        glVertex2d(it->x,it->y);
    glEnd();
    glBegin(GL_TRIANGLE_FAN);
    glVertex2d(-1,-1);
    for(QVector<Points>::const_iterator it=circle.begin()+60;it<circle.begin()+90;it++)
        glVertex2d(it->x,it->y);
    glEnd();
    glBegin(GL_TRIANGLE_FAN);
    glVertex2d(1u,-1);
    for(QVector<Points>::const_iterator it=circle.begin()+90;it<circle.end();it++)
        glVertex2d(it->x,it->y);
    glEnd();
}

void Daddy::GenerationRay(void)
{
    GenerationRay(ROUND_DEGREE);
}

void Daddy::GenerationRay(quint16 angle)
{
    ray.clear();
    Points*i=radians,*end=radians+angle;
    //while(i<end)ray.append(clockwise ? end-- : i++);
    while(i<end)clockwise ? ray.prepend(i++) : ray.append(i++);
    ray_position=ray.begin(); //Устанавливаем стартовую позицию луча
}

void Daddy::DrawRay(void)const
{
    QColor color=Color;
    color.setAlphaF(settings["system"]["brightness"].toDouble());
    qglColor(color);
    glLineWidth(3.0f*settings["system"]["focus"].toDouble());
    glBegin(GL_LINES);
        glVertex2d(static_cast<GLdouble>(.0f),static_cast<GLdouble>(.0f));
        glVertex2d((*ray_position)->x,(*ray_position)->y);
    glEnd();
}

void Daddy::ChangeFPS(qreal fps)
{
    if(fps<=.0f && IsActive())
        timer.stop();
    if(fps>.0f)
    {
        if(IsActive())
            timer.stop();
        timer.start(fps,this);
    }
}

QPixmap Daddy::RotateResourceImage(const QString resource_path,const qint16 degree)
{
    QPixmap original=QPixmap(resource_path),
            pixmap(original.size());
    pixmap.fill(Qt::transparent);

    QPainter p(&pixmap);
    p.translate(pixmap.size().width()/2,pixmap.size().height()/2);
    p.rotate(degree);
    p.translate(-pixmap.size().width()/2,-pixmap.size().height()/2);
    p.drawPixmap(0u,0u,original);
    p.end();
    return original=pixmap;
}

bool Daddy::IsAllVisible(void)const
{
    return show;
}

void Daddy::SetAllVisible(bool state)
{
    show=state;
}

qreal Daddy::GetRandomCoord(quint8 accuracy,const bool rsign)const
{
    //Фикс странного бага, наблюдающегося под виндой
    if(accuracy>4u)
        accuracy=4u;

    qreal a=(qrand()%quint32(qPow(10u,accuracy)+1u))/qPow(10u,accuracy);
    if(rsign)
        return a*GetRandomSign();
    return a;
}

qint8 Daddy::GetRandomSign(void)const
{
    if(rand()%2u)
        return 1u;
    return-1;
}

void Daddy::TargetsActions()
{
    quint8 count=TargetsSettings::GetTargetsGount();
    if(count!=0)
    {
        for(quint8 i=0u;i<count;i++)
        {
            if(!S.targets[20].isEmpty())
                if(!S.targets[20][i].isEmpty())
                    S.targets[20][i].pop_front();
            if(!S.targets[30].isEmpty())
                if(!S.targets[30][i].isEmpty())
                    S.targets[30][i].pop_front();
            if(!S.targets[45].isEmpty())
                if(!S.targets[45][i].isEmpty())
                    S.targets[45][i].pop_front();
            if(!S.targets[60].isEmpty())
                if(!S.targets[60][i].isEmpty())
                    S.targets[60][i].pop_front();
            if(!S.targets[90].isEmpty())
                if(!S.targets[90][i].isEmpty())
                    S.targets[90][i].pop_front();
            if(!S.targets[150].isEmpty())
                if(!S.targets[150][i].isEmpty())
                    S.targets[150][i].pop_front();
        }
    }
}
