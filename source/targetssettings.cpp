#include"targetssettings.h"
#include"ui_targetssettings.h"
#include<QDebug>

quint16 TargetsSettings::time=12u;
quint8 TargetsSettings::targets_count=0u;
QVector<TargetsSettings::Targets> TargetsSettings::T;
TargetsSettings::TargetsSettings(QWidget *parent) : QMainWindow(parent),ui(new Ui::TargetsSettings)
{
    ui->setupUi(this);
    T.clear();
    targets_count=ui->Targets->count();
    QCheckBox *checkbox;
    for(quint8 widget=0u;widget<targets_count;widget++)
    {
        ui->Targets->setCurrentIndex(widget);
        checkbox=ui->Targets->currentWidget()->findChild<QCheckBox*>(QString("%1%2").arg("TargetGoHome").arg(widget+1)),
        connect(
            checkbox,
            SIGNAL(stateChanged(int)),
            this,
            SLOT(on_TargetsGoHome_stateChanged(int))
        );
        checkbox->stateChanged(checkbox->checkState());
    }
    ui->Targets->setCurrentIndex(0);
}

TargetsSettings::~TargetsSettings()
{
    delete ui;
}

quint8 TargetsSettings::GetTargetsGount()
{
    return targets_count;
}

void TargetsSettings::on_ApplyTargets_clicked()
{
    quint8 old=ui->Targets->currentIndex();
    Targets t;
    QGroupBox* Gb,*Gbi;
    T.clear();
    for(quint8 widget=0u;widget<GetTargetsGount();widget++)
    {
        ui->Targets->setCurrentIndex(widget);
        t.speed=ui->Targets->currentWidget()->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetSpeed").arg(widget+1u))->value();
        if(ui->Targets->currentWidget()->findChild<QCheckBox*>(QString("%1%2").arg("TargetGoHome").arg(widget+1u))->isChecked())
            t.L=ui->Targets->currentWidget()->findChild<QRadioButton*>(QString("%1%2").arg("TargetGoHome330").arg(widget+1u))->isChecked() ? Landing::SECOND : Landing::FIRST;
        else
            t.L=Landing::NO;

        Gb=ui->Targets->currentWidget()->findChild<QGroupBox*>(QString("%1%2").arg("TargetStart").arg(widget+1u));
        t.Points[0].angle=Gb->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthStart").arg(widget+1u))->value();
        t.Points[0].range=Gb->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeStart").arg(widget+1u))->value();

        Gb=ui->Targets->currentWidget()->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremums").arg(widget+1u));
        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumFirst").arg(widget+1u));
        t.Points[1].angle=Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumFirst").arg(widget+1u))->value();
        t.Points[1].range=Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumFirst").arg(widget+1u))->value();

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumSecond").arg(widget+1u));
        t.Points[2].angle=Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumSecond").arg(widget+1u))->value();
        t.Points[2].range=Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumSecond").arg(widget+1u))->value();

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumThird").arg(widget+1u));
        t.Points[3].angle=Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumThird").arg(widget+1u))->value();
        t.Points[3].range=Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumThird").arg(widget+1u))->value();

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumFourth").arg(widget+1u));
        t.Points[4].angle=Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumFourth").arg(widget+1u))->value();
        t.Points[4].range=Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumFourth").arg(widget+1u))->value();
        T.append(t);
    }
    ui->Targets->setCurrentIndex(old);
    close();
}

void TargetsSettings::on_TargetsGoHome_stateChanged(int arg)
{
    QRadioButton *radio1,*radio2;
    radio1=QObject::sender()->parent()->findChild<QRadioButton*>(QString("%1%2").arg("TargetGoHome150").arg(ui->Targets->currentIndex()+1));
    radio2=QObject::sender()->parent()->findChild<QRadioButton*>(QString("%1%2").arg("TargetGoHome330").arg(ui->Targets->currentIndex()+1));
    if((radio1->isChecked() && radio2->isChecked()) || (!radio1->isChecked() && !radio2->isChecked()))
    {
        radio1->setChecked(true);
        radio2->setChecked(false);
    }
    radio1->setEnabled(arg==2);
    radio2->setEnabled(arg==2);
}

void TargetsSettings::on_SwitchTargetNext_clicked()
{
    quint8 pos=static_cast<quint8>(ui->Targets->currentIndex());
    if(pos<GetTargetsGount()-1u)
        pos++;
    else
        pos=0u;
    ui->Targets->setCurrentIndex(pos);
}

void TargetsSettings::on_SwitchTargetPrev_clicked()
{
    quint8 pos=static_cast<quint8>(ui->Targets->currentIndex());
    if(pos>0u)
        pos--;
    else
        pos=GetTargetsGount()-1u;
    ui->Targets->setCurrentIndex(pos);
}

const QVector<TargetsSettings::Targets> TargetsSettings::GetTargetsStorage()
{
    return T;
}

void TargetsSettings::on_SetTargetsDefault_clicked()
{
    quint8 old=ui->Targets->currentIndex();
    QGroupBox* Gb,*Gbi;
    for(quint8 widget=0u;widget<GetTargetsGount();widget++)
    {
        ui->Targets->setCurrentIndex(widget);
        ui->Targets->currentWidget()->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetSpeed").arg(widget+1u))->setValue(qrand()%1000);
        if(qrand()%60>30)
        {
            ui->Targets->currentWidget()->findChild<QCheckBox*>(QString("%1%2").arg("TargetGoHome").arg(widget+1u))->setChecked(true);
            if(qrand()%60<30)
                ui->Targets->currentWidget()->findChild<QRadioButton*>(QString("%1%2").arg("TargetGoHome330").arg(widget+1u))->setChecked(true);
        }

        Gb=ui->Targets->currentWidget()->findChild<QGroupBox*>(QString("%1%2").arg("TargetStart").arg(widget+1u));
        Gb->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthStart").arg(widget+1u))->setValue(qrand()%360);
        Gb->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeStart").arg(widget+1u))->setValue(qrand()%150);

        Gb=ui->Targets->currentWidget()->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremums").arg(widget+1u));
        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumFirst").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumFirst").arg(widget+1u))->setValue(qrand()%360);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumFirst").arg(widget+1u))->setValue(qrand()%150);

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumSecond").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumSecond").arg(widget+1u))->setValue(qrand()%360);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumSecond").arg(widget+1u))->setValue(qrand()%150);

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumThird").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumThird").arg(widget+1u))->setValue(qrand()%360);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumThird").arg(widget+1u))->setValue(qrand()%150);

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumFourth").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumFourth").arg(widget+1u))->setValue(qrand()%360);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumFourth").arg(widget+1u))->setValue(qrand()%150);

    }
    ui->Targets->setCurrentIndex(old);
}

void TargetsSettings::on_SaveTargets_clicked()
{
    quint8 old=ui->Targets->currentIndex();
    QGroupBox* Gb,*Gbi;
    for(quint8 widget=0u;widget<GetTargetsGount();widget++)
    {
        ui->Targets->setCurrentIndex(widget);
        ui->Targets->currentWidget()->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetSpeed").arg(widget+1u))->setValue(0);
        ui->Targets->currentWidget()->findChild<QRadioButton*>(QString("%1%2").arg("TargetGoHome150").arg(widget+1u))->setChecked(true);
        ui->Targets->currentWidget()->findChild<QCheckBox*>(QString("%1%2").arg("TargetGoHome").arg(widget+1u))->setChecked(false);

        Gb=ui->Targets->currentWidget()->findChild<QGroupBox*>(QString("%1%2").arg("TargetStart").arg(widget+1u));
        Gb->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthStart").arg(widget+1u))->setValue(0);
        Gb->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeStart").arg(widget+1u))->setValue(0);

        Gb=ui->Targets->currentWidget()->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremums").arg(widget+1u));
        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumFirst").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumFirst").arg(widget+1u))->setValue(0);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumFirst").arg(widget+1u))->setValue(0);

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumSecond").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumSecond").arg(widget+1u))->setValue(0);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumSecond").arg(widget+1u))->setValue(0);

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumThird").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumThird").arg(widget+1u))->setValue(0);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumThird").arg(widget+1u))->setValue(0);

        Gbi=Gb->findChild<QGroupBox*>(QString("%1%2").arg("TargetExtremumFourth").arg(widget+1u));
        Gbi->findChild<QSpinBox*>(QString("%1%2").arg("TargetAzimuthExtremumFourth").arg(widget+1u))->setValue(0);
        Gbi->findChild<QDoubleSpinBox*>(QString("%1%2").arg("TargetRangeExtremumFourth").arg(widget+1u))->setValue(0);

    }
    ui->Targets->setCurrentIndex(old);
}
