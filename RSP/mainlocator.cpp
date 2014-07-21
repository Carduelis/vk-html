#include"mainlocator.h"
#include<QDebug>

MainLocator::MainLocator(QWidget *parent) : Daddy(parent)
{
    S.range.clear();
    S.azimuth.clear();
    GenerationRay();
}

MainLocator::~MainLocator()
{

}

/**
 * Переводим градусы в радианы
 */
void MainLocator::GenerationRadians(void)
{
    for(quint16 i=0u;i<ROUND_DEGREE;i++)
    {
        radians[i].angle=GetRadianValue(i);
        radians[i].x=qFastCos(radians[i].angle);
        radians[i].y=qFastSin(radians[i].angle);
    }
}


void MainLocator::GenerationRadians(bool)
{
    for(quint16 i=0u;i<ROUND_DEGREE;i++)
    {
        radians[i].angle=GetRadianValue(i);
        radians[i].x=qFastCos(radians[i].angle)*circle.at(circle_counter).x;
        radians[i].y=qFastSin(radians[i].angle)*circle.at(circle_counter).y;
    }
}

/**
 * Рисуем ВПП
 */
void MainLocator::DrawStation(void)const
{
    glRotatef(LOCATOR_ROTATE_ANGLE,.0f,.0f,1.0f);
    glLineWidth(2.0f*settings["system"]["focus"].toDouble());
    QColor color=Color;
    color.setAlphaF(settings["system"]["brightness"].toDouble());
    qglColor(color);
    qreal
        rx=CalcScaleValue(5.0f),
        ry=2u*rx;
    glTranslatef(rx,.0f,.0f);
    glBegin(GL_LINES);
        glVertex2d(-rx,-ry);
        glVertex2d(-rx,ry);

        glVertex2d(-rx,ry);
        glVertex2d(rx,ry);

        glVertex2d(-rx,-ry);
        glVertex2d(rx,-ry);

        glVertex2d(rx,-ry);
        glVertex2d(rx,ry);
    glEnd();
    glTranslatef(-rx,.0f,.0f);
    glRotatef(-LOCATOR_ROTATE_ANGLE,.0f,.0f,1.0f);
}

/**
 * Привязываем азимутальное исчисление
 */
void MainLocator::InitLocatorGrid(void)const
{
    glRotatef(90.0f,.0f,.0f,1.0f);
}

/**
 * Обновление остаточного изображения
 */
void MainLocator::ContinueSearch(void)
{
    updateGL();
    quint8 count_targets=TargetsSettings::GetTargetsGount();
    if(ray_position==ray.end()-1u)
    {
        ray_position=ray.begin();
        //Impulse (Temporary: It's time to hitrozhop hacks)
        if(settings["active_insync_trash"]["show"].toBool() && S.active_insync_trash[scale][0].isEmpty())
            GenerationActiveInSyncTrash();
        if(!S.active_insync_trash[scale][0].isEmpty())
            S.active_insync_trash[scale][0].pop_front();
        if(!S.active_insync_trash[scale][1].isEmpty())
            S.active_insync_trash[scale][1].pop_front();
        if(!S.active_insync_trash[scale][2].isEmpty())
            S.active_insync_trash[scale][2].pop_front();
        if(!S.active_insync_trash[scale][3].isEmpty())
            S.active_insync_trash[scale][3].pop_front();
        for(quint8 i=0u;i<count_targets;i++)
        {
            if(!S.targets[scale].isEmpty())
                if(!S.targets[scale][i].isEmpty())
                    S.targets[scale][i].pop_front();
        }
        //TargetsActions();
    }
    ray_position++;
}

/**
 * Конвертация значения относительно масштаба
 */
template<typename T>T MainLocator::CalcScaleValue(const T value,MainLocator::Scale scale) const
{
    return static_cast<T>(value)/scale;
}

template<typename T>T MainLocator::CalcScaleValue(const T value)const
{
    return CalcScaleValue(value,scale);
}

/**
 * Режим вывода отметок азимута
 */
MainLocator::Azimuth MainLocator::GetCurrentAzimuthMode(void)const
{
    return azimuth;
}

void MainLocator::SetCurrentAzimuthMode(const MainLocator::Azimuth a)
{
    azimuth=a;
    GenerationAzimuth();
}

/**
 * Режим вывода отметок дальности
 */
MainLocator::Range MainLocator::GetCurrentRangeMode(void)const
{
    return range;
}

void MainLocator::SetCurrentRangeMode(const MainLocator::Range r)
{
    range=r;
    GenerationRange();
}

/**
 * Масштаб
 */
MainLocator::Scale MainLocator::GetCurrentScaleMode(void)const
{
    return scale;
}

void MainLocator::SetCurrentScaleMode(const MainLocator::Scale s)
{
    scale=s;
    GenerationRange();
    GenerationTrash();
    GenerationLocalItems();
    GenerationMeteo();
}

/**
 * Режим работы ДРЛ
 */
MainLocator::WorkMode MainLocator::GetCurrentWorkMode(void)const
{
    return work_mode;
}

void MainLocator::SetCurrentWorkMode(const MainLocator::WorkMode wm)
{
    work_mode=wm;
}

/**
 * Генерация координат отметок дальности
 */
void MainLocator::GenerationRange(void)
{
    S.range[scale].clear();
    quint8 j=0u,d=0u;
    qreal delta=CalcScaleValue(static_cast<qreal>(range));

    switch(range)
    {
        case Range::R_NO:
            return;
        case Range::R_FIRST:
            j=5u;
            break;
        case Range::R_SECOND:
        default:
            j=1u;
    }

    RoundLine cache;
    quint16 c=0u;
    for(qreal r=.0f;r<=1.0f;r+=delta,d++)
    {
        cache.width=d%j==0u ? 3.5f : 1.0f;
        cache.Coordinates=new Points[ROUND_DEGREE];
        c=0u;
        for(Points *i=radians,*e=radians+ROUND_DEGREE;i<e;i++,c++)
        {
            cache.Coordinates[c].angle=i->angle;
            cache.Coordinates[c].x=r*i->x;
            cache.Coordinates[c].y=r*i->y;
        }
        S.range[scale].append(cache);
    }
    Current.range=&S.range[scale];
}

/**
 * Отрисовка отметок дальности
 */
void MainLocator::DrawRange(void)const
{
    if(Current.range->isEmpty())
        return;
    qreal alpha,
          focus=settings["system"]["focus"].toDouble(),
          brightness=settings["brightness"]["range"].isValid() ? settings["brightness"]["range"].toDouble() : 1.0f;
    brightness*=settings["system"]["brightness"].toDouble();
    QColor color=Color;
    for(QVector<RoundLine>::const_iterator it=(*Current.range).begin(),end=(*Current.range).end();it<end;it++)
    {
        glLineWidth(it->width*focus);
        glBegin(GL_LINE_STRIP);
            for(Points *i=it->Coordinates,*e=it->Coordinates+ROUND_DEGREE;i<e;i++)
            {
                alpha=CalcAlpha(i->angle);
                if(alpha>.0f)
                {
                    alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                    color.setAlphaF(alpha*brightness);
                    qglColor(color);
                    glVertex2f(i->x,i->y);
                }
            }
        glEnd();
    }
    /*
    for(QVector<RoundLine>::const_iterator it=Cache.range[scale].begin(),end=Cache.range[scale].end();it<end;it++)
    {
        glLineWidth(it->width);
        glBegin(GL_LINE_STRIP);
            for(Points *i=it->Coordinates,*e=it->Coordinates+ROUND_DEGREE;i<e;i++)
                glVertex2f(i->x,i->y);
        glEnd();
    }
    */
}

/**
 * Генерация координат отметок азимута
 */
void MainLocator::GenerationAzimuth(void)
{
    S.azimuth.clear();
    if(azimuth==Azimuth::A_NO)
        return;

    CenterStraightLine cache;
    for(Points *i=radians,*e=radians+ROUND_DEGREE;i<e;i+=azimuth)
    {
        cache.width=(i-radians)%A_SECOND>0u ? 1.0f : 3.5f;
        cache.Coordinates.angle=i->angle;
        cache.Coordinates.x=i->x;
        cache.Coordinates.y=i->y;
        S.azimuth.append(cache);
    }
    Current.azimuth=&S.azimuth;
}

/**
 * Отрисовка координат отметок азимута
 */
void MainLocator::DrawAzimuth(void)const
{
    if(Current.azimuth->isEmpty())
        return;
    qreal alpha,
          focus=settings["system"]["focus"].toDouble(),
          brightness=settings["brightness"]["azimuth"].isValid() ? settings["brightness"]["azimuth"].toDouble() : 1.0f;
    brightness*=settings["system"]["brightness"].toDouble();
    QColor color=Color;
    for(QVector<CenterStraightLine>::const_iterator it=Current.azimuth->begin(),end=Current.azimuth->end();it<end;it++)
    {
        alpha=CalcAlpha(it->Coordinates.angle);
        if(alpha>.0f)
        {
            alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
            glLineWidth(it->width*focus);
            glBegin(GL_LINES);
                color.setAlphaF(brightness*alpha);
                qglColor(color);
                glVertex2f(.0f,.0f);
                glVertex2f(it->Coordinates.x,it->Coordinates.y);
            glEnd();
        }
    }
    /*
    for(QVector<CenterStraightLine>::const_iterator it=Cache.azimuth.begin(),end=Cache.azimuth.end();it<end;it++)
    {
        glLineWidth(it->width);
        glBegin(GL_LINES);
            glVertex2f(.0f,.0f);
            glVertex2f(it->Coordinates.x,it->Coordinates.y);
        glEnd();
    }*/
}

void MainLocator::GenerationTrash(void)
{
    CreateEllipseTrashArea(S.trash[scale],settings["trash"]["begin"].toDouble(),settings["trash"]["end"].toDouble(),.0f,.0f,settings["trash"]["intensity"].toDouble());
}

void MainLocator::DrawTrash(void)const
{
    DrawEllipseTrashArea(S.trash[scale],2u);
}

void MainLocator::GenerationLocalItems(void)
{
    CreateEllipseTrashArea(S.local_items[scale],.0f,15.0f,.0f,.0f);
}

void MainLocator::DrawLocalItems(void)const
{
    DrawEllipseTrashArea(S.local_items[scale],8u);
}

void MainLocator::CreateEllipseTrashArea(QVector<PointsR>&storage,qreal begin,qreal end,qreal offset_x,qreal offset_y,qreal intensity,bool ellipse,bool clear)
{
    qreal rand;
    begin=CalcScaleValue(begin),
    end=CalcScaleValue(end);
    if(clear)
        storage.clear();
    PointsR cache;
    for(Points*i=radians,*k=radians+ROUND_DEGREE;i<k;i++)
        for(quint16 l=0u,t=fmod(qrand(),intensity);l<t;l++)
        {
            rand=begin+fmod(GetRandomCoord(4u),end-begin);
            cache.x=i->x*rand+CalcScaleValue(offset_x);
            cache.y=i->y*rand+CalcScaleValue(offset_y);
            cache.r=qSqrt(qPow(cache.x,2u)+qPow(cache.y,2u));

            if(offset_x!=.0f || offset_y!=.0f)
                cache.angle=qAtan2(cache.y,cache.x);
            else
                cache.angle=i->angle;
            storage.append(cache);
        }
}

void MainLocator::DrawEllipseTrashArea(QVector<PointsR>storage,quint8 size)const
{
    WorkMode wm=GetCurrentWorkMode();
    if(wm!=WorkMode::WM_PASS)
        return;
    glPointSize(size*settings["system"]["focus"].toDouble());
    glEnable(GL_ALPHA_TEST);
    qreal alpha;
    QColor color=Color;
    for(QVector<PointsR>::const_iterator it=storage.begin();it<storage.end();it++)
    {
        alpha=CalcAlpha(it->angle);
        if(alpha>.0f)
        {
            alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
            alpha*=settings["system"]["brightness"].toDouble()+it->r-settings["system"]["varu"].toDouble();
            alpha*=settings["system"]["brightness"].toDouble();
            color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
            glBegin(GL_POINTS);
                qglColor(color);
                glVertex2f(it->x,it->y);
            glEnd();
        }
    }
}

void MainLocator::GenerationMeteo(void)
{
    CreateEllipseTrashArea(S.meteo[scale][0],0.0f,7.0f,-17.0f,-27.0f,3u);
    CreateEllipseTrashArea(S.meteo[scale][1],0.0f,7.0f,73.0f,-94.0f,3u);
    CreateEllipseTrashArea(S.meteo[scale][2],0.0f,7.0f,-74.0f,56.0f,3u);
    CreateEllipseTrashArea(S.meteo[scale][3],0.0f,7.0f,94.0f,112.0f,3u);
}

void MainLocator::DrawMeteo(void)const
{
    DrawEllipseTrashArea(S.meteo[scale][0],5);
    DrawEllipseTrashArea(S.meteo[scale][1],5);
    DrawEllipseTrashArea(S.meteo[scale][2],5);
    DrawEllipseTrashArea(S.meteo[scale][3],5);
}

void MainLocator::GenerationActiveNoiseTrash(void)
{
    const quint8 density=17;
    qint16 angle;
    const quint16 d=100u,d2=40u;
    S.active_noise_trash.clear();

    RoundLine cache;
    switch(settings["active_noise_trash"]["intensity"].toUInt())
    {
        case 0:
            angle=settings["active_noise_trash"]["azimuth"].toUInt();
            for(Points*i=radians+ROUND_DEGREE-angle,*k=radians+ROUND_DEGREE-angle+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
            {
                cache.Coordinates=new Points[1];
                cache.Coordinates->angle=i->angle;
                cache.Coordinates->x=i->x;
                cache.Coordinates->y=i->y;
                cache.width=GetRandomCoord(4)*density;
                S.active_noise_trash.append(cache);
            }
            if(angle<ACTIVE_NOISE_TRASH_SECTOR)
                for(Points*i=radians,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    S.active_noise_trash.append(cache);
                }
                break;
        case 1:
            angle=settings["active_noise_trash"]["azimuth"].toUInt();
            for(Points*i=radians+ROUND_DEGREE-angle,*k=radians+ROUND_DEGREE-angle+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
            {
                cache.Coordinates=new Points[1];
                cache.Coordinates->angle=i->angle;
                cache.Coordinates->x=i->x;
                cache.Coordinates->y=i->y;
                cache.width=GetRandomCoord(4)*density;
                S.active_noise_trash.append(cache);
            }

            if(angle<ACTIVE_NOISE_TRASH_SECTOR)
                for(Points*i=radians,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    S.active_noise_trash.append(cache);
                }

            for(Points*i=radians+ROUND_DEGREE-angle+d,*k=radians+ROUND_DEGREE-angle+d+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
            {
                cache.Coordinates=new Points[1];
                cache.Coordinates->angle=i->angle;
                cache.Coordinates->x=i->x;
                cache.Coordinates->y=i->y;
                cache.width=GetRandomCoord(4)*density;
                cache.width/=5;
                S.active_noise_trash.append(cache);
            }

            if(angle<ACTIVE_NOISE_TRASH_SECTOR+d)
                for(Points*i=radians-angle+d,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+d;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }
            for(Points*i=radians+ROUND_DEGREE-angle+2u*d,*k=radians+ROUND_DEGREE-angle+2u*d+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
            {
                cache.Coordinates=new Points[1];
                cache.Coordinates->angle=i->angle;
                cache.Coordinates->x=i->x;
                cache.Coordinates->y=i->y;
                cache.width=GetRandomCoord(4)*density;
                cache.width/=5;
                S.active_noise_trash.append(cache);
            }

            if(angle<ACTIVE_NOISE_TRASH_SECTOR+2u*d)
                for(Points*i=radians-angle+2u*d,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+2u*d;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }
            break;
        case 2:
                angle=settings["active_noise_trash"]["azimuth"].toUInt();
                for(Points*i=radians+ROUND_DEGREE-angle,*k=radians+ROUND_DEGREE-angle+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR)
                    for(Points*i=radians-angle,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width/=5;
                        S.active_noise_trash.append(cache);
                    }

                for(Points*i=radians+ROUND_DEGREE-angle+2u*d2,*k=radians+ROUND_DEGREE-angle+2u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+2u*d2)
                    for(Points*i=radians-angle+2u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+2u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width;
                        S.active_noise_trash.append(cache);
                    }

                for(Points*i=radians+ROUND_DEGREE-angle+3u*d2,*k=radians+ROUND_DEGREE-angle+3u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+3u*d2)
                    for(Points*i=radians-angle+3u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+3u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width/=5;
                        S.active_noise_trash.append(cache);
                    }
                for(Points*i=radians+ROUND_DEGREE-angle+4u*d2,*k=radians+ROUND_DEGREE-angle+4u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+4u*d2)
                    for(Points*i=radians-angle+4u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+4u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width/=5;
                        S.active_noise_trash.append(cache);
                    }

                for(Points*i=radians+ROUND_DEGREE-angle+5u*d2,*k=radians+ROUND_DEGREE-angle+5u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+5u*d2)
                    for(Points*i=radians-angle+5u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+5u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width;
                        S.active_noise_trash.append(cache);
                    }

                for(Points*i=radians+ROUND_DEGREE-angle+6u*d2,*k=radians+ROUND_DEGREE-angle+6u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+6u*d2)
                    for(Points*i=radians-angle+6u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+6u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width/=5;
                        S.active_noise_trash.append(cache);
                    }

                for(Points*i=radians+ROUND_DEGREE-angle+7u*d2,*k=radians+ROUND_DEGREE-angle+7u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+7u*d2)
                    for(Points*i=radians-angle+7u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+7u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width/=5;
                        S.active_noise_trash.append(cache);
                    }
                for(Points*i=radians+ROUND_DEGREE-angle+8u*d2,*k=radians+ROUND_DEGREE-angle+8u*d2+ACTIVE_NOISE_TRASH_SECTOR;i<k;i++)
                {
                    cache.Coordinates=new Points[1];
                    cache.Coordinates->angle=i->angle;
                    cache.Coordinates->x=i->x;
                    cache.Coordinates->y=i->y;
                    cache.width=GetRandomCoord(4)*density;
                    cache.width/=5;
                    S.active_noise_trash.append(cache);
                }

                if(angle<ACTIVE_NOISE_TRASH_SECTOR+8u*d2)
                    for(Points*i=radians-angle+8u*d2,*k=radians+ACTIVE_NOISE_TRASH_SECTOR-angle+8u*d2;i<k;i++)
                    {
                        cache.Coordinates=new Points[1];
                        cache.Coordinates->angle=i->angle;
                        cache.Coordinates->x=i->x;
                        cache.Coordinates->y=i->y;
                        cache.width=GetRandomCoord(4)*density;
                        cache.width;
                        S.active_noise_trash.append(cache);
                    }
            break;
    }
}

void MainLocator::DrawActiveNoiseTrash(void)const
{
    WorkMode wm=GetCurrentWorkMode();
    if(wm==WorkMode::WM_SDC)
        return;
    qreal alpha;
    QColor color=Color;
    for(QVector<RoundLine>::const_iterator it=S.active_noise_trash.begin();it<S.active_noise_trash.end();it++)
    {
        alpha=CalcAlpha(it->Coordinates->angle);
        if(alpha>0)
        {
            glLineWidth(it->width*settings["system"]["focus"].toDouble());
            alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
            glBegin(GL_LINES);
            color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
            qglColor(color);
            glVertex2d(.0f,.0f);
            glVertex2f(it->Coordinates->x,it->Coordinates->y);
            glEnd();
        }
    }
}

void MainLocator::GenerationActiveAnswerTrash(void)
{
    //Crash fixes
    if(!settings["active_answer_trash"]["distance"].isValid() || settings["active_answer_trash"]["distance"]<=.0f)
        return;

    qreal r=.0f,delta;
    S.active_answer_trash[scale].clear();

    delta=CalcScaleValue(settings["active_answer_trash"]["distance"].toDouble());
    /*
    switch(settings["system"]["range"].toUInt())
    {
        case 1:
            delta=distance*10u;
            break;
        case 0:
            return;
        default:
            delta=distance*50u;
    }
    */

    RoundLineR cache;
    quint16 c,
            angle=settings["active_answer_trash"]["azimuth"].toUInt();
    while(r<=1.0f)
    {
        cache.width=6.5f;
        cache.Coordinates=new PointsR[TRASH_ACTIVE_LENGTH];
        c=0u;

        for(Points *i=radians+ROUND_DEGREE-angle,*end=radians+ROUND_DEGREE-angle+TRASH_ACTIVE_LENGTH;i<end;i++,c++)
        {
            cache.Coordinates[c].angle=i->angle;
            cache.Coordinates[c].r=r;
            cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
            cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
        }
        S.active_answer_trash[scale].append(cache);
        r+=delta;
    }
}

void MainLocator::DrawActiveAnswerTrash(void)const
{
    WorkMode wm=GetCurrentWorkMode();
    if(wm==WorkMode::WM_SDC)
        return;

    qreal alpha,brightness;
    brightness=1.0f;
    QColor color=Color;
    for(QVector<RoundLineR>::const_iterator it=S.active_answer_trash[scale].begin();it<S.active_answer_trash[scale].end();it++)
    {
        glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
        glBegin(GL_LINE_STRIP);
        for(PointsR *i=it->Coordinates,*end=it->Coordinates+TRASH_ACTIVE_LENGTH;i<end;i++)
        {
            alpha=CalcAlpha(i->angle);
            if(alpha>.0f)
            {
                alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                alpha*=(settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble());
                color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                qglColor(color);
                glVertex2d(i->x,i->y);
            }
        }
        glEnd();
    }
}

void MainLocator::GenerationActiveInSyncTrash(void)
{
    //if(!settings["active_insync_trash"]["distance"].isValid() || settings["active_insync_trash"]["distance"]<=.0f)
        //return;

    qreal r=.0f,delta;
    S.active_insync_trash[scale].clear();

    delta=CalcScaleValue(3.0f);//CalcScaleValue(settings["active_insync_trash"]["distance"].toDouble());

    RoundLineR cache,cache2,cache3,cache4;
    quint16 c,a=0u;//settings["active_insync_trash"]["azimuth"].toUInt();
    const quint16 angle=20u,d=90u;
    while(r<=1.0f)
    {
        cache.width=6.5f;
        cache.Coordinates=new PointsR[TRASH_ACTIVE_LENGTH];
        c=0u;

        for(Points *i=radians+ROUND_DEGREE-angle-a,*end=radians+ROUND_DEGREE-angle+TRASH_ACTIVE_LENGTH-a;i<end;i++,c++)
        {
            cache.Coordinates[c].angle=i->angle;
            cache.Coordinates[c].r=r;
            cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
            cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
        }
        S.active_insync_trash[scale][0].append(cache);

        cache2.width=6.5f;
        cache2.Coordinates=new PointsR[TRASH_ACTIVE_LENGTH];
        c=0u;
        for(Points *i=radians+ROUND_DEGREE-(d+angle)-a,*end=radians+ROUND_DEGREE-(d+angle)+TRASH_ACTIVE_LENGTH-a;i<end;i++,c++)
        {
            cache2.Coordinates[c].angle=i->angle;
            cache2.Coordinates[c].r=r;
            cache2.Coordinates[c].x=cache.Coordinates[c].r*i->x;
            cache2.Coordinates[c].y=cache.Coordinates[c].r*i->y;
        }
        S.active_insync_trash[scale][1].append(cache2);

        cache3.width=6.5f;
        cache3.Coordinates=new PointsR[TRASH_ACTIVE_LENGTH];
        c=0u;
        for(Points *i=radians+ROUND_DEGREE-(2u*d+angle)-a,*end=radians+ROUND_DEGREE-(2u*d+angle)+TRASH_ACTIVE_LENGTH-a;i<end;i++,c++)
        {
            cache3.Coordinates[c].angle=i->angle;
            cache3.Coordinates[c].r=r;
            cache3.Coordinates[c].x=cache.Coordinates[c].r*i->x;
            cache3.Coordinates[c].y=cache.Coordinates[c].r*i->y;
        }

        S.active_insync_trash[scale][2].append(cache3);

        cache4.width=6.5f;
        cache4.Coordinates=new PointsR[TRASH_ACTIVE_LENGTH];
        c=0u;
        for(Points *i=radians+ROUND_DEGREE-(3u*d+angle)-a,*end=radians+ROUND_DEGREE-(3u*d+angle)+TRASH_ACTIVE_LENGTH-a;i<end;i++,c++)
        {
            cache4.Coordinates[c].angle=i->angle;
            cache4.Coordinates[c].r=r;
            cache4.Coordinates[c].x=cache.Coordinates[c].r*i->x;
            cache4.Coordinates[c].y=cache.Coordinates[c].r*i->y;
        }

        S.active_insync_trash[scale][3].append(cache4);
        r+=delta;
        a+=5u;
    }
    S.active_insync_trash[scale][0].pop_front();
    S.active_insync_trash[scale][1].pop_front();
    S.active_insync_trash[scale][2].pop_front();
    S.active_insync_trash[scale][3].pop_front();
}

void MainLocator::DrawActiveInSyncTrash(void)const
{
    qreal alpha,brightness;
    brightness=1.0f;
    QColor color=Color;
    //for(QVector<RoundLineR>::const_iterator it=S.active_insync_trash[scale][0].begin();it<S.active_insync_trash[scale][0].end();it++)
    QVector<RoundLineR>::const_iterator it=S.active_insync_trash[scale][0].begin();
    {
        glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
        glBegin(GL_LINE_STRIP);
        for(PointsR *i=it->Coordinates,*end=it->Coordinates+TRASH_ACTIVE_LENGTH;i<end;i++)
        {
            alpha=CalcAlpha(i->angle);
            if(alpha>.0f)
            {
                alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                alpha*=settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble();
                color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                qglColor(color);
                glVertex2d(i->x,i->y);
            }
        }
        glEnd();
    }

    //for(QVector<RoundLineR>::const_iterator it=S.active_insync_trash[scale][1].begin();it<S.active_insync_trash[scale][1].end();it++)
    it=S.active_insync_trash[scale][1].begin();
    {
        glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
        glBegin(GL_LINE_STRIP);
        for(PointsR *i=it->Coordinates,*end=it->Coordinates+TRASH_ACTIVE_LENGTH;i<end;i++)
        {
            alpha=CalcAlpha(i->angle);
            if(alpha>.0f)
            {
                alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                alpha*=settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble();
                color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                qglColor(color);
                glVertex2d(i->x,i->y);
            }
        }
        glEnd();
    }

    //for(QVector<RoundLineR>::const_iterator it=S.active_insync_trash[scale][2].begin();it<S.active_insync_trash[scale][2].end();it++)
    it=S.active_insync_trash[scale][2].begin();
    {
        glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
        glBegin(GL_LINE_STRIP);
        for(PointsR *i=it->Coordinates,*end=it->Coordinates+TRASH_ACTIVE_LENGTH;i<end;i++)
        {
            alpha=CalcAlpha(i->angle);
            if(alpha>.0f)
            {
                alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                alpha*=settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble();
                color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                qglColor(color);
                glVertex2d(i->x,i->y);
            }
        }
        glEnd();
    }

    //for(QVector<RoundLineR>::const_iterator it=S.active_insync_trash[scale][3].begin();it<S.active_insync_trash[scale][3].end();it++)
    it=S.active_insync_trash[scale][3].begin();
    {
        glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
        glBegin(GL_LINE_STRIP);
        for(PointsR *i=it->Coordinates,*end=it->Coordinates+TRASH_ACTIVE_LENGTH;i<end;i++)
        {
            alpha=CalcAlpha(i->angle);
            if(alpha>.0f)
            {
                alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                alpha*=settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble();
                color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                qglColor(color);
                glVertex2d(i->x,i->y);
            }
        }
        glEnd();
    }
}

qreal MainLocator::CalcAlpha(qreal angle)const
{
    qreal alpha;
    if(IsAllVisible())
        alpha=1.0f;
    else
    {
        alpha=(clockwise ? -1 : 1)*((*ray_position)->angle-angle);
        if(alpha<.0f)
            alpha+=2u*M_PI;
    }
    return alpha;
}

void MainLocator::GenerationTargets(void)
{
    //QHash<quint16,QHash<quint8,QVector<RoundLineR> > >targets;
    QVector<TargetsSettings::Targets> vt=TargetsSettings::GetTargetsStorage();
    qreal ar=.0f,d1=.0f,d2=.0f,d=.0f,speed=.0f,angle=1u;
    quint8 z=0u;
    RoundLineR cache;
    cache.width=6.5f;
    //QVector<TargetsSettings::Targets>::const_iterator it=vt.begin();
    for(QVector<TargetsSettings::Targets>::const_iterator it=vt.begin();it<vt.end();it++,z++)
    {
        d1=CalcScaleValue(it->Points[0].range);
        d2=CalcScaleValue(it->Points[1].range);
        d=d1;
        speed=qCeil(it->speed/350);
        angle*=1;
        if(angle<=0)
            angle=1;
        ar=qAbs(static_cast<qreal>(d2-d1)*angle/(it->Points[1].angle-it->Points[0].angle));
        if(it->Points[0].angle<=it->Points[1].angle)
            for(quint16 a=it->Points[0].angle;a<=it->Points[1].angle;a+=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                //speed=qFloor(static_cast<qreal>(it->speed)/250);
                d1<d2 ? d+=ar : d-=ar;
            }
        else
        {
            for(quint16 a=it->Points[0].angle;a>it->Points[1].angle;a-=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }
        }

        d1=CalcScaleValue(it->Points[1].range);
        d2=CalcScaleValue(it->Points[2].range);
        ar=qAbs(static_cast<qreal>(d2-d1)*angle/(it->Points[2].angle-it->Points[1].angle));
        d=d1;
        if(it->Points[1].angle<=it->Points[2].angle)
            for(quint16 a=it->Points[1].angle;a<=it->Points[2].angle;a+=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }
        else
            for(quint16 a=it->Points[1].angle;a>it->Points[2].angle;a-=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }

        d1=CalcScaleValue(it->Points[2].range);
        d2=CalcScaleValue(it->Points[3].range);
        ar=qAbs(static_cast<qreal>(d2-d1)*angle/(it->Points[3].angle-it->Points[2].angle));
        d=d1;
        if(it->Points[2].angle<=it->Points[3].angle)
            for(quint16 a=it->Points[2].angle;a<=it->Points[3].angle;a+=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }
        else
            for(quint16 a=it->Points[2].angle;a>it->Points[3].angle;a-=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }

        d1=CalcScaleValue(it->Points[3].range);
        d2=CalcScaleValue(it->Points[4].range);
        ar=qAbs(static_cast<qreal>(d2-d1)*angle/(it->Points[4].angle-it->Points[3].angle));
        d=d1;
        if(it->Points[3].angle<=it->Points[4].angle)
            for(quint16 a=it->Points[3].angle;a<=it->Points[4].angle;a+=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }
        else
            for(quint16 a=it->Points[3].angle;a>it->Points[4].angle;a-=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
            }

        if(it->L!=TargetsSettings::Landing::NO)
        {
            d1=CalcScaleValue(it->Points[4].range);
            d2=CalcScaleValue(10.0f);
            ar=qAbs(static_cast<qreal>(d2-d1)*angle/(it->L-it->Points[4].angle));
            d=d1;
            if(it->Points[4].angle<=it->L)
                for(quint16 a=it->Points[4].angle;a<=it->L;a+=angle)
                {
                    cache.Coordinates=new PointsR[TARGET_LENGTH];
                    quint16 c=0u;
                    for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                    {
                        cache.Coordinates[c].angle=i->angle;
                        cache.Coordinates[c].r=d;
                        cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                        cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                    }
                    S.targets[scale][z].append(cache);
                    d1<d2 ? d+=ar : d-=ar;
                }
            else
                for(quint16 a=it->Points[4].angle;a>it->L;a-=angle)
                {
                    cache.Coordinates=new PointsR[TARGET_LENGTH];
                    quint16 c=0u;
                    for(Points *i=radians+ROUND_DEGREE-a,*end=radians+ROUND_DEGREE+TARGET_LENGTH-a;i<end;i++,c++)
                    {
                        cache.Coordinates[c].angle=i->angle;
                        cache.Coordinates[c].r=d;
                        cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                        cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                    }
                    S.targets[scale][z].append(cache);
                    d1<d2 ? d+=ar : d-=ar;
                }

            d1=CalcScaleValue(10.0f);
            d2=CalcScaleValue(.0f);
            d=d1;
            while(d>d2)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+ROUND_DEGREE-it->L,*end=radians+ROUND_DEGREE+TARGET_LENGTH-it->L;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d-=static_cast<qreal>(d1-d2)/10.0f;
            }

        }
    }
}

void MainLocator::DrawTargets(void)
{
    //QHash<quint16,QHash<quint8,QVector<RoundLineR> > >targets;
    if(!TargetsSettings::GetTargetsStorage().isEmpty() && S.targets[scale].isEmpty())
        GenerationTargets();
    if(TargetsSettings::GetTargetsStorage().isEmpty())
        return;
    qreal alpha,brightness=1.0f;
    QColor color=Color;
    for(quint8 z=0u;z<TargetsSettings::GetTargetsGount();z++)
    {
      //  for(QVector<RoundLineR>::const_iterator it=S.targets[scale][z].begin();it<S.targets[scale][z].end();it++)
        QVector<RoundLineR>::const_iterator it=S.targets[scale][z].begin();
        {
            glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
            glBegin(GL_LINE_STRIP);
            //glBegin(GL_LINES);
            for(PointsR *i=it->Coordinates,*end=it->Coordinates+TARGET_LENGTH;i<end;i++)
            {
                alpha=CalcAlpha(i->angle);
                if(alpha>.0f)
                {
                    alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                    alpha*=settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble();
                    color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                    qglColor(color);
                    glVertex2f(i->x,i->y);
                    /*
                    if(i->y>0 && i->x>0 || i->x<0 && i->y<0)
                    {
                        glVertex2f(i->x-0.02,i->y+0.02);
                        glVertex2f(i->x+0.02,i->y-0.02);
                    }
                    else if(i->y==0)
                    {
                        glVertex2f(i->x,i->y-0.02);
                        glVertex2f(i->x,i->y+0.02);
                    }
                    else if(i->x==0)
                    {
                        glVertex2f(i->x-0.02,i->y);
                        glVertex2f(i->x+0.02,i->y);
                    }
                    else
                    {
                        glVertex2f(i->x-0.02,i->y-0.02);
                        glVertex2f(i->x+0.02,i->y+0.02);
                    }
                    */
                }
            }
            glEnd();
        }
    }
}
