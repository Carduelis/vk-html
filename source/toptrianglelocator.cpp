#include"toptrianglelocator.h"
#include<QDebug>

TopTriangleLocator::TopTriangleLocator(QWidget *parent) : Daddy(parent)
{
    GenerationRadians();
    GenerationRay(TRIANGLE_ANGLE_RANGE);
}

TopTriangleLocator::~TopTriangleLocator()
{

}

void TopTriangleLocator::GenerationRadians(void)
{
    delete radians;
    radians=new Points[TRIANGLE_ANGLE_RANGE];
    qreal a=0u;
    qreal cos=qFastCos(GetRadianValue(TRIANGLE_ANGLE));
    for(quint16 i=0u;i<TRIANGLE_ANGLE_RANGE;i++)
    {
        a=(static_cast<qreal>(i)/TRIANGLE_ANGLE_SPEED_FIX)-TRIANGLE_ANGLE;
        radians[i].angle=GetRadianValue(a);
        radians[i].x=cos;
        radians[i].y=qFastSin(radians[i].angle);
    }
}

void TopTriangleLocator::DrawStation(void)const
{
    qreal rad=GetRadianValue(TRIANGLE_ANGLE),
          rad_1=GetRadianValue(-TRIANGLE_ANGLE),
          sin=qFastSin(rad),
          cos=qFastCos(rad),
          sin1=qFastSin(rad_1),
          cos1=qFastCos(rad_1);
    glRotatef(270.0f,.0f,.0f,1.0f);
    glTranslatef(GRID_OFFSET,.0f,.0f);
    glScalef(1.7f,3.15f,1.0f);
    //glScalef(1.7f,3.7f,1.0f);
    glLineWidth(2.0f*settings["system"]["focus"].toDouble());
    QColor color=Color;
    color.setAlphaF(settings["system"]["brightness"].toDouble());
    qglColor(color);
    glBegin(GL_LINES);
        glVertex2f(.0f,.0f);
        glVertex2f(cos1,sin1);

        glVertex2f(.0f,.0f);
        glVertex2f(cos,sin);

        glVertex2f(.0f,.0f);
        glVertex2f(cos,qFastSin(GetRadianValue(10u)));

        glVertex2f(cos1,sin1);
        glVertex2f(cos,sin);
    glEnd();
}

void TopTriangleLocator::InitLocatorGrid(void)const{}

void TopTriangleLocator::ContinueSearch(void)
{
    updateGL();
    if(ray_position==ray.end()-1u)
    {
        clockwise=!clockwise; //Для обращения в другую сторону!
        GenerationRay(TRIANGLE_ANGLE_RANGE);
        ray_position=ray.begin();
    }
    ray_position++;
}

template<typename T>T TopTriangleLocator::CalcScaleValue(const T value,TopTriangleLocator::Scale scale) const
{
    return static_cast<T>(value)/scale;
}

template<typename T>T TopTriangleLocator::CalcScaleValue(const T value)const
{
    return CalcScaleValue(value,scale);
}

TopTriangleLocator::Azimuth TopTriangleLocator::GetCurrentAzimuthMode(void)const
{
    return azimuth;
}

void TopTriangleLocator::SetCurrentAzimuthMode(const TopTriangleLocator::Azimuth a)
{
    azimuth=a;
    GenerationAzimuth();
}

TopTriangleLocator::Range TopTriangleLocator::GetCurrentRangeMode(void)const
{
    return range;
}

void TopTriangleLocator::SetCurrentRangeMode(const TopTriangleLocator::Range r)
{
    range=r;
    GenerationRange();
}


TopTriangleLocator::Scale TopTriangleLocator::GetCurrentScaleMode(void)const
{
    return scale;
}

void TopTriangleLocator::SetCurrentScaleMode(const TopTriangleLocator::Scale s)
{
    scale=s;
    GenerationRange();
}

TopTriangleLocator::WorkMode TopTriangleLocator::GetCurrentWorkMode(void)const
{
    return work_mode;
}

void TopTriangleLocator::SetCurrentWorkMode(const TopTriangleLocator::WorkMode wm)
{
    work_mode=wm;
}

void TopTriangleLocator::GenerationRange(void)
{
    S.range[scale].clear();
    quint8 j=0u,d=0u;
    qreal delta=CalcScaleValue(static_cast<qreal>(range));

    switch(range)
    {
        case Range::R_NO:
            return;
        case Range::R_FIRST:
            j=2u;
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
        cache.Coordinates=new Points[TRIANGLE_ANGLE_RANGE];
        c=0u;
        for(Points *i=radians,*e=radians+TRIANGLE_ANGLE_RANGE;i<e;i++,c++)
        {
            cache.Coordinates[c].angle=i->angle;
            cache.Coordinates[c].x=r*i->x;
            cache.Coordinates[c].y=r*i->y;
        }
        S.range[scale].append(cache);
    }
    Current.range=&S.range[scale];
}

void TopTriangleLocator::DrawRange(void)const
{
    if(Current.range->isEmpty())
        return;
    qreal alpha,
          focus=settings["system"]["focus"].toDouble(),
          brightness=settings["brightness"]["range"].isValid() ? settings["brightness"]["range"].toDouble() : 1.0f;
    brightness*=settings["system"]["brightness"].toDouble();
    QColor color=Color;
    for(QVector<RoundLine>::const_iterator it=(Current.range)->begin(),end=(Current.range)->end();it<end;it++)
    {
        glLineWidth(it->width*focus);
        glBegin(GL_LINE_STRIP);
            for(Points *i=it->Coordinates,*e=it->Coordinates+TRIANGLE_ANGLE_RANGE;i<e;i++)
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
}

void TopTriangleLocator::GenerationAzimuth(void)
{
    S.azimuth.clear();
    if(azimuth==Azimuth::A_NO)
        return;

    CenterStraightLine cache;
    for(Points *i=radians,*e=radians+TRIANGLE_ANGLE_RANGE;i<e;i+=TRIANGLE_ANGLE_SPEED_FIX*azimuth)
    {
        cache.width=(i-radians)%(TRIANGLE_ANGLE_SPEED_FIX*A_SECOND)>0u ? 1.0f : 3.5f;
        cache.Coordinates.angle=i->angle;
        cache.Coordinates.x=i->x;
        cache.Coordinates.y=i->y;
        S.azimuth.append(cache);
    }
    Current.azimuth=&S.azimuth;
}

void TopTriangleLocator::DrawAzimuth(void)const
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
}

void TopTriangleLocator::CreateEllipseTrashArea(QVector<PointsR>&storage,qreal begin,qreal end,qreal offset_x,qreal offset_y,qreal intensity,bool ellipse,bool clear)
{
    qreal rand;
    begin=CalcScaleValue(begin),
    end=CalcScaleValue(end);
    if(clear)
        storage.clear();
    PointsR cache;
    for(Points*i=radians,*k=radians+TRIANGLE_ANGLE_RANGE;i<k;i++)
    {
        for(quint16 l=0u,t=fmod(qrand(),intensity);l<t;l++)
        {
            if(ellipse)
            {
                rand=begin+fmod(GetRandomCoord(4u),end-begin);
                cache.x=i->x*rand+CalcScaleValue(offset_x)+GetRandomSign();//*CalcScaleValue(offset_x*rand);
                rand=begin+fmod(GetRandomCoord(4u),end-begin);
                cache.y=i->y*rand+CalcScaleValue(offset_y)+GetRandomSign();//*CalcScaleValue(offset_y*rand);
            }
            else
            {
                rand=begin+fmod(GetRandomCoord(4u),end-begin);
                cache.x=i->x*rand+CalcScaleValue(offset_x);
                cache.y=i->y*rand+CalcScaleValue(offset_y);
            }
            cache.r=qSqrt(qPow(cache.x,2u)+qPow(cache.y,2u));
            if(offset_x>.0f || offset_y>.0f)
                if(cache.x==0)
                    cache.angle=M_PI/2;
                else
                    cache.angle=qAtan2(cache.y,cache.x);
            else
                cache.angle=i->angle;
            storage.append(cache);
        }
    }
}

void TopTriangleLocator::DrawEllipseTrashArea(QVector<PointsR>storage,quint8 size)const
{
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


void TopTriangleLocator::GenerationTrash(void)
{
    CreateEllipseTrashArea(S.trash[scale],settings["trash"]["begin"].toDouble(),settings["trash"]["end"].toDouble(),.0f,.0f,settings["trash"]["intensity"].toDouble());
}

void TopTriangleLocator::DrawTrash(void)const
{
    DrawEllipseTrashArea(S.trash[scale],2u);
}

void TopTriangleLocator::GenerationLocalItems(void)
{

}

void TopTriangleLocator::DrawLocalItems(void)const
{

}

void TopTriangleLocator::GenerationMeteo(void)
{

}

void TopTriangleLocator::DrawMeteo(void)const
{

}

void TopTriangleLocator::GenerationActiveNoiseTrash()
{

}

void TopTriangleLocator::DrawActiveNoiseTrash()const
{

}

void TopTriangleLocator::GenerationActiveAnswerTrash(void)
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
        cache.Coordinates=new PointsR[TARGET_LENGTH];
        c=0u;

        for(Points *i=radians+TRIANGLE_ANGLEx2-angle,*end=radians+TRIANGLE_ANGLEx2-angle+TRIANGLE_ANGLEx2;i<end;i++,c++)
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

void TopTriangleLocator::DrawActiveAnswerTrash(void)const
{
    qreal alpha,brightness;
    brightness=1.0f;
    QColor color=Color;
    for(QVector<RoundLineR>::const_iterator it=S.active_answer_trash[scale].begin();it<S.active_answer_trash[scale].end();it++)
    {
        glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
        glBegin(GL_LINE_STRIP);
        for(PointsR *i=it->Coordinates,*end=it->Coordinates+TARGET_LENGTH;i<end;i++)
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

void TopTriangleLocator::GenerationActiveInSyncTrash(void){}
void TopTriangleLocator::DrawActiveInSyncTrash(void)const{}

qreal TopTriangleLocator::CalcAlpha(qreal angle)const
{
    qreal alpha;
    if(IsAllVisible())
        alpha=1.0f;
    else
    {
        alpha=(clockwise ? -1 : 1)*((*ray_position)->angle-angle);

        if(clockwise && (*ray_position)->angle-angle>0)
        {
            alpha+=GetRadianValue(TRIANGLE_ANGLEx2);
            alpha=0.6-alpha;
        }

        if(!clockwise && angle-(*ray_position)->angle>0)
        {
            alpha+=GetRadianValue(TRIANGLE_ANGLEx2);
            alpha=0.6-alpha;
        }
    }
    return alpha;
}

void TopTriangleLocator::GenerationTargets(void)
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
        if(it->L==TargetsSettings::NO)
            continue;

        d1=CalcScaleValue(it->Points[0].range);
        d2=CalcScaleValue(it->Points[1].range);
        d=d1;
        speed=qCeil(it->speed/250);
        if(speed<=0)
            speed=1;
        angle*=speed;
        ar=qAbs(static_cast<qreal>(d2-d1)*angle/(it->Points[1].angle-it->Points[0].angle));
        if(it->Points[0].angle<=it->Points[1].angle)
            for(quint16 a=it->Points[0].angle;a<=it->Points[1].angle;a+=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
            for(quint16 a=it->Points[0].angle;a>it->Points[1].angle;a-=angle)
            {
                cache.Coordinates=new PointsR[TARGET_LENGTH];
                quint16 c=0u;
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
                {
                    cache.Coordinates[c].angle=i->angle;
                    cache.Coordinates[c].r=d;
                    cache.Coordinates[c].x=cache.Coordinates[c].r*i->x;
                    cache.Coordinates[c].y=cache.Coordinates[c].r*i->y;
                }
                S.targets[scale][z].append(cache);
                d1<d2 ? d+=ar : d-=ar;
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                    for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                    for(Points *i=radians+TRIANGLE_ANGLE_RANGE-a,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-a;i<end;i++,c++)
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
                for(Points *i=radians+TRIANGLE_ANGLE_RANGE-it->L,*end=radians+TRIANGLE_ANGLE_RANGE+TARGET_LENGTH-it->L;i<end;i++,c++)
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

void TopTriangleLocator::DrawTargets(void)
{
    return;
    //QHash<quint16,QHash<quint8,QVector<RoundLineR> > >targets;
    if(!TargetsSettings::GetTargetsStorage().isEmpty() && S.targets[scale].isEmpty())
        GenerationTargets();
    if(TargetsSettings::GetTargetsStorage().isEmpty() || S.targets[scale].isEmpty())
        return;
    qreal alpha,brightness=1.0f;
    QColor color=Color;
    for(quint8 z=0u;z<TargetsSettings::GetTargetsGount();z++)
    {
        for(QVector<RoundLineR>::const_iterator it=S.targets[scale][z].begin();it<S.targets[scale][z].end();it++)
        //QVector<RoundLineR>::const_iterator it=S.targets[scale][z].begin();
        {
            glLineWidth(it->width*settings["system"]["focus"].toDouble()*brightness);
            glBegin(GL_LINES);
            for(PointsR *i=it->Coordinates,*end=it->Coordinates+TARGET_LENGTH;i<end;i++)
            {
                alpha=CalcAlpha(i->angle);
                if(alpha>.0f)
                {
                    alpha=alpha<settings["system"]["lightning"].toDouble() ? 1.0f : settings["system"]["lightning"].toDouble()/alpha;
                    alpha*=settings["system"]["brightness"].toDouble()+i->r-settings["system"]["varu"].toDouble();
                    color.setAlphaF(alpha>1u ? 1.0f : alpha<.0f ? .0f : alpha);
                    qglColor(color);
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
                }
            }
            glEnd();
        }
    }
}
