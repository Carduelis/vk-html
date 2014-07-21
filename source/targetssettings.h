#ifndef TARGETSSETTINGS_H
#define TARGETSSETTINGS_H

#include<QMainWindow>
#include"daddy.h"

namespace Ui
{
    class TargetsSettings;
}

class TargetsSettings : public QMainWindow
{
    Q_OBJECT

    public:
        explicit TargetsSettings(QWidget *parent=0);
        ~TargetsSettings();
        static quint8 GetTargetsGount();
        static quint16 time;
        enum Landing{NO=0u,FIRST=150u,SECOND=330u};
        struct Targets
        {
            Daddy::TargetsStorage Points[5];
            Landing L;
            qreal speed;
        };
        static const QVector<Targets> GetTargetsStorage();

    private slots:
        void on_ApplyTargets_clicked();
        void on_TargetsGoHome_stateChanged(int arg);
        void on_SwitchTargetNext_clicked();
        void on_SwitchTargetPrev_clicked();

        void on_SetTargetsDefault_clicked();

        void on_SaveTargets_clicked();

private:
        static quint8 targets_count;
        Ui::TargetsSettings *ui;
        static QVector<Targets>T;
};

#endif // TARGETSSETTINGS_H
