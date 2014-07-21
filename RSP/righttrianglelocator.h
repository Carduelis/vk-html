#ifndef RIGHTTRIANGLELOCATOR_H
#define RIGHTTRIANGLELOCATOR_H

#include"daddy.h"
#include"targetssettings.h"

#ifndef TRIANGLE_ANGLE
#define TRIANGLE_ANGLE  8
#endif

#ifndef TRIANGLE_ANGLE_SPEED_FIX
#define TRIANGLE_ANGLE_SPEED_FIX  8u
#endif

#ifndef TRIANGLE_ANGLE_RANGE
#define TRIANGLE_ANGLE_RANGE TRIANGLE_ANGLE_SPEED_FIX*TRIANGLE_ANGLE+1u
#endif

class RightTriangleLocator : public Daddy
{
    Q_OBJECT
    public:
        explicit RightTriangleLocator(QWidget *parent=0);
        ~RightTriangleLocator();
        enum Azimuth{A_NO=0u,A_FIRST=1u,A_SECOND=2u};
        enum Range{R_NO=0u,R_FIRST=5u,R_SECOND=10u};
        enum Scale{S_SMALL=20u,S_MIDDLE=30u,S_LARGE=60u};
        enum WorkMode{WM_AKT=0u,WM_PASS,WM_SDC,WM_COMMON};

        Azimuth GetCurrentAzimuthMode(void)const;
        void SetCurrentAzimuthMode(const Azimuth);
        Range GetCurrentRangeMode(void)const;
        void SetCurrentRangeMode(const Range);
        Scale GetCurrentScaleMode(void)const;
        void SetCurrentScaleMode(const Scale);
        WorkMode GetCurrentWorkMode(void)const;
        void SetCurrentWorkMode(const WorkMode);

    signals:

    public slots:
    protected:
        Azimuth azimuth=Azimuth::A_NO;
        Range range=Range::R_NO;
        Scale scale=Scale::S_SMALL;
        WorkMode work_mode=WorkMode::WM_PASS;
        qreal CalcAlpha(qreal angle)const;
        void GenerationRadians(void);
        void DrawStation(void)const;
        void InitLocatorGrid(void)const;
        void ContinueSearch(void);
        void GenerationRange(void);
        void DrawRange(void)const;
        void GenerationAzimuth(void);
        void DrawAzimuth(void)const;
        void GenerationTrash(void);
        void DrawTrash(void)const;
        void GenerationLocalItems(void);
        void DrawLocalItems(void)const;
        void GenerationMeteo(void);
        void DrawMeteo(void)const;
        void GenerationActiveNoiseTrash(void);
        void DrawActiveNoiseTrash(void)const;
        void GenerationActiveAnswerTrash(void);
        void DrawActiveAnswerTrash(void)const;
        void GenerationActiveInSyncTrash(void);
        void DrawActiveInSyncTrash(void) const;
        void CreateEllipseTrashArea(QVector<PointsR>&storage,qreal begin,qreal end,qreal offset_x,qreal offset_y,qreal intensity=3.0f,bool ellipse=false,bool clear=true);
        void DrawEllipseTrashArea(QVector<PointsR>storage,quint8 size=8u)const;
        void GenerationTargets(void);
        void DrawTargets(void);

    template<typename T>T CalcScaleValue(const T value,Scale scale)const;
    template<typename T>T CalcScaleValue(const T value)const;
};

#endif // RIGHTTRIANGLELOCATOR_H
