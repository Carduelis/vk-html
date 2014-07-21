#include"righttrianglelocator.h"
#include<QDebug>

RightTriangleLocator::RightTriangleLocator(QWidget *parent) : Daddy(parent)
{
    GenerationRadians();
    GenerationRay(TRIANGLE_ANGLE_RANGE);
}

RightTriangleLocator::~RightTriangleLocator()
{

}

void RightTriangleLocator::GenerationRadians(void)
{
    delete radians;
    radians=new Points[TRIANGLE_ANGLE_RANGE];
    qreal cos=qFastCos(GetRadianValue(TRIANGLE_ANGLE));
    for(quint16 i=0u;i<TRIANGLE_ANGLE_RANGE;i++)
    {
        radians[i].angle=GetRadianValue(static_cast<qreal>(i)/TRIANGLE_ANGLE_SPEED_FIX);
        radians[i].x=cos;
        radians[i].y=qFastSin(radians[i].angle);
    }
}

void RightTriangleLocator::DrawStation(void)const
{
    qreal rad=GetRadianValue(TRIANGLE_ANGLE),
          rad_1=GetRadianValue(-TRIANGLE_ANGLE),
          sin=qFastSin(rad),
          cos=qFastCos(rad),
          sin1=qFastSin(rad_1),
          cos1=qFastCos(rad_1),
          sin0=qFastSin(GetRadianValue(0u));
    glScalef(1.0f,4.5f,1.0f);
    glTranslatef(-cos1,sin1,.0f);
    glTranslatef(0.18,.0f,.0f);
    glScalef(1.6f,2.0f,1.0f);
    glLineWidth(2.0f*settings["system"]["focus"].toDouble());
    QColor color=Color;
    color.setAlphaF(settings["system"]["brightness"].toDouble());
    qglColor(color);
    glBegin(GL_LINES);
        glVertex2f(.0f,.0f);
        glVertex2f(cos1,sin0);

        glVertex2f(.0f,.0f);
        glVertex2f(cos,sin);

        glVertex2f(.15f,.0f);
        glVertex2f(cos,qFastSin(GetRadianValue(2.7)));

        glVertex2f(cos1,sin0);
        glVertex2f(cos,sin);
    glEnd();
}

void RightTriangleLocator::InitLocatorGrid(void)const{}
void RightTriangleLocator::ContinueSearch(void)
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

template<typename T>T RightTriangleLocator::CalcScaleValue(const T value,RightTriangleLocator::Scale scale) const
{
    return static_cast<T>(value)/scale;
}

template<typename T>T RightTriangleLocator::CalcScaleValue(const T value)const
{
    return CalcScaleValue(value,scale);
}

RightTriangleLocator::Azimuth RightTriangleLocator::GetCurrentAzimuthMode(void)const
{
    return azimuth;
}

void RightTriangleLocator::SetCurrentAzimuthMode(const RightTriangleLocator::Azimuth a)
{
    azimuth=a;
    GenerationAzimuth();
}

RightTriangleLocator::Range RightTriangleLocator::GetCurrentRangeMode(void)const
{
    return range;
}

void RightTriangleLocator::SetCurrentRangeMode(const RightTriangleLocator::Range r)
{
    range=r;
    GenerationRange();
}


RightTriangleLocator::Scale RightTriangleLocator::GetCurrentScaleMode(void)const
{
    return scale;
}

void RightTriangleLocator::SetCurrentScaleMode(const RightTriangleLocator::Scale s)
{
    scale=s;
    GenerationRange();
}

RightTriangleLocator::WorkMode RightTriangleLocator::GetCurrentWorkMode(void)const
{
    return work_mode;
}

void RightTriangleLocator::SetCurrentWorkMode(const RightTriangleLocator::WorkMode wm)
{
    work_mode=wm;
}

void RightTriangleLocator::GenerationRange(void)
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

void RightTriangleLocator::DrawRange(void)const
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

void RightTriangleLocator::GenerationAzimuth(void)
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

void RightTriangleLocator::DrawAzimuth(void)const
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

void RightTriangleLocator::CreateEllipseTrashArea(QVector<PointsR>&storage,qreal begin,qreal end,qreal offset_x,qreal offset_y,qreal intensity,bool ellipse,bool clear)
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

void RightTriangleLocator::DrawEllipseTrashArea(QVector<PointsR>storage,quint8 size)const
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

void RightTriangleLocator::GenerationTrash(void)
{
    CreateEllipseTrashArea(S.trash[scale],settings["trash"]["begin"].toDouble(),settings["trash"]["end"].toDouble(),.0f,.0f,settings["trash"]["intensity"].toDouble());
}

void RightTriangleLocator::DrawTrash(void)const
{
    DrawEllipseTrashArea(S.trash[scale],2u);
}


void RightTriangleLocator::GenerationLocalItems(void)
{

}

void RightTriangleLocator::DrawLocalItems(void)const
{

}

void RightTriangleLocator::GenerationMeteo(void)
{

}

void RightTriangleLocator::DrawMeteo(void)const
{

}

void RightTriangleLocator::GenerationActiveNoiseTrash()
{

}

void RightTriangleLocator::DrawActiveNoiseTrash()const
{

}

void RightTriangleLocator::GenerationActiveAnswerTrash(void){}
void RightTriangleLocator::DrawActiveAnswerTrash(void)const{}
void RightTriangleLocator::GenerationActiveInSyncTrash(void){}
void RightTriangleLocator::DrawActiveInSyncTrash(void)const{}

qreal RightTriangleLocator::CalcAlpha(qreal angle)const
{
    qreal alpha;
    if(IsAllVisible())
        alpha=1.0f;
    else
    {
        alpha=(clockwise ? -1 : 1)*((*ray_position)->angle-angle);
        if(clockwise && (*ray_position)->angle-angle>0)
        {
            alpha+=GetRadianValue(TRIANGLE_ANGLE);
            alpha=0.2-alpha;
        }

        if(!clockwise && angle-(*ray_position)->angle>0)
        {
            alpha+=GetRadianValue(TRIANGLE_ANGLE);
            alpha=0.2-alpha;
        }
    }
    return alpha;
}

void RightTriangleLocator::GenerationTargets(void)
{return;
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
        speed=qCeil(it->speed/100);
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

void RightTriangleLocator::DrawTargets(void)
{
    //QHash<quint16,QHash<quint8,QVector<RoundLineR> > >targets;
    if(!TargetsSettings::GetTargetsStorage().isEmpty() && S.targets[scale].isEmpty())
        GenerationTargets();
    if(TargetsSettings::GetTargetsStorage().isEmpty() || S.targets[scale].isEmpty())
        return;
    qreal alpha,brightness=1.0f;
    QColor color=Color;
    for(quint8 z=0u;z<TargetsSettings::GetTargetsGount();z++)
    {
        if(S.targets[scale][z].isEmpty())
            continue;
        //for(QVector<RoundLineR>::const_iterator it=S.targets[scale][z].begin();it<S.targets[scale][z].end();it++)
        QVector<RoundLineR>::const_iterator it=S.targets[scale][z].begin();
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
