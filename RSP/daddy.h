#ifndef DADDY_H
#define DADDY_H

#include<QGLWidget>
#include<QBasicTimer>
#include<QTimerEvent>
#include<QVariant>
#include<QMouseEvent>
#include<qmath.h>
#include"helpers.h"
#include<QDebug>


#ifndef ROUND_DEGREE
#define ROUND_DEGREE 361u
#endif

#ifndef CIRCLE_CLEARANCE
#define CIRCLE_CLEARANCE 3u
#endif

#ifndef GetRadianValue
#define GetRadianValue(degree) (M_PI*degree)/180
#endif

#ifndef TARGET_LENGTH
#define TARGET_LENGTH 10u
#endif

#ifndef TRASH_ACTIVE_LENGTH
#define TRASH_ACTIVE_LENGTH 10u
#endif

#ifndef GL_MULTISAMPLE
#define GL_MULTISAMPLE  0x809D
#endif

class Daddy : public QGLWidget
{
    Q_OBJECT
    public:
        explicit Daddy(QWidget *parent=0);
        ~Daddy();
        template<typename OptionType>void SetSettings(const QString group,const QString name,const OptionType option);
        template<typename OptionType>void SetSettings(const QString name,const OptionType option);
        bool IsActive(void)const;
        bool IsAllVisible(void)const;
        void SetAllVisible(bool);
        void ChangeFPS(qreal fps);
        static QPixmap RotateResourceImage(const QString resource_path,const qint16 degree);
        bool clockwise=true;
        QColor Color;
        struct Points
        {
            qreal x,y,angle;
        }*radians;

        struct PointsR : public Points
        {
            qreal r;
        };
        struct RoundLine
        {
            qreal width;
            Points *Coordinates=nullptr;
        };

        struct RoundLineR
        {
            qreal width;
            PointsR *Coordinates=nullptr;
        };

        struct CenterStraightLine
        {
            qreal width;
            Points Coordinates;
        };

        struct TargetsStorage
        {
            qreal angle;
            qreal range;
        };

    signals:

    public slots:

    protected:
        struct Storage
        {
            QHash<quint16,QVector<PointsR> >trash,local_items;
            QHash<quint8,QHash<quint16,QVector<PointsR> > >meteo;
            QHash<quint16,QVector<RoundLine> >range;
            QHash<quint16,QVector<RoundLineR> >active_answer_trash;
            QHash<quint16,QHash<quint8,QVector<RoundLineR> > >active_insync_trash,targets;
            QVector<CenterStraightLine>azimuth;
            QVector<RoundLine>active_noise_trash;
        }S;

        struct Pointer
        {
            QVector<RoundLine>*range=nullptr;
            QVector<CenterStraightLine>*azimuth=nullptr;
        }Cache,Current;

        void mouseDoubleClickEvent(QMouseEvent  *event);
        void timerEvent(QTimerEvent *event);
        void initializeGL();
        void resizeGL(int width,int height);
        void paintGL();
        virtual qreal CalcAlpha(qreal angle)const=0;
        void LocatorArea(void)const;
        void PostDraw(void)const;
        void GenerationRadians(void);
        virtual void GenerationRange(void)=0;
        virtual void DrawRange(void)const=0;
        virtual void GenerationAzimuth(void)=0;
        virtual void DrawAzimuth(void)const=0;
        virtual void ContinueSearch(void)=0;
        virtual void DrawStation(void)const=0;
        virtual void InitLocatorGrid(void)const=0;
        void GenerationRay(void);
        void GenerationRay(quint16 angle);
        void DrawRay(void)const;
        void TargetsActions();

        virtual void GenerationTrash(void)=0;
        virtual void DrawTrash(void)const=0;
        virtual void GenerationLocalItems(void)=0;
        virtual void DrawLocalItems(void)const=0;
        virtual void GenerationMeteo(void)=0;
        virtual void DrawMeteo(void)const=0;
        virtual void GenerationActiveNoiseTrash(void)=0;
        virtual void DrawActiveNoiseTrash(void)const=0;
        virtual void GenerationActiveAnswerTrash(void)=0;
        virtual void DrawActiveAnswerTrash(void)const=0;
        virtual void GenerationActiveInSyncTrash(void)=0;
        virtual void DrawActiveInSyncTrash(void)const=0;
        virtual void GenerationTargets(void)=0;
        virtual void DrawTargets(void)=0;

        qint8 GetRandomSign(void)const;
        qreal GetRandomCoord(quint8 accuracy,const bool rsign=false)const;
        bool show=false;
        QMap<QString,QMap<QString,QVariant> >settings;
        QVector<Points>circle;
        QVector<Points*>ray;
        QVector<Points*>::const_iterator ray_position;
        QBasicTimer timer;
        int width=0u,height=0u;
        quint16 counter=0u,
                circle_counter=0u;
};

template<typename OptionType>void Daddy::SetSettings(const QString group, const QString name,const OptionType option)
{
    settings[group][name]=QVariant::fromValue(option);
    if(group=="trash")
        GenerationTrash();
    if(group=="local_items" && name=="show")
        GenerationLocalItems();
    if(group=="meteo" && name=="show")
        GenerationMeteo();
    if(group=="active_noise_trash")
        GenerationActiveNoiseTrash();
    if(group=="active_answer_trash")
        GenerationActiveAnswerTrash();
    if(group=="active_insync_trash")
        GenerationActiveInSyncTrash();

    if(group!="common")
        updateGL();
}

template<typename OptionType>void Daddy::SetSettings(const QString name,const OptionType option)
{
    SetSettings("common",name,option);
}

#endif // DADDY_H
