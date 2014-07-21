#include"indicatordrl.h"
#include"ui_indicatordrl.h"
#include<QDebug>

IndicatorDRL::IndicatorDRL(QWidget *parent) : QMainWindow(parent),ui(new Ui::IndicatorDRL)
{
    ui->setupUi(this);
    ui->RenderMainLocator->SetCurrentAzimuthMode(MainLocator::Azimuth::A_FIRST);
    ui->RenderMainLocator->SetCurrentRangeMode(MainLocator::Range::R_FIRST);
    ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_SMALL);
    ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_PASS);

    ui->ChangeIndicatorBrightness->hide();
    ui->ChangeIndicatorLightning->hide();
    ui->ChangeIndicatorFocus->hide();
    ui->ChangeIndicatorVARU->hide();

    ui->ChangeTrashIntensity->hide();

    ui->ChangeIndicatorBrightness->valueChanged(ui->ChangeIndicatorBrightness->value());
    ui->ChangeIndicatorLightning->valueChanged(ui->ChangeIndicatorLightning->value());
    ui->ChangeIndicatorFocus->valueChanged(ui->ChangeIndicatorFocus->value());
    ui->ChangeIndicatorVARU->valueChanged(ui->ChangeIndicatorVARU->value());
    ui->ChangeTrashIntensity->valueChanged(ui->ChangeTrashIntensity->value());
    ui->ChangeTrashIntensity->sliderReleased();
    ui->InputScatterTrashFrom->valueChanged(ui->InputScatterTrashFrom->value());
    ui->InputScatterTrashTo->valueChanged(ui->InputScatterTrashTo->value());
    ui->CheckShowLocalItems->stateChanged(ui->CheckShowLocalItems->checkState());
    ui->CheckShowMeteo->stateChanged(ui->CheckShowMeteo->checkState());
    //Статика
    ui->RenderMainLocator->SetSettings("offset","horizontal",.0f);
    ui->RenderMainLocator->SetSettings("offset","vertical",.0f);


    QStringList intensity;
    intensity<<"Слабая"<<"Средняя"<<"Сильная";
    ui->SelectActiveNoiseIntensity->addItems(intensity);
    ui->SelectActiveNoiseIntensity->setCurrentIndex(1);
    ui->InputActiveNoiseAzimuth->valueChanged(ui->InputActiveNoiseAzimuth->value());
    ui->CheckActiveNoiseShow->stateChanged(ui->CheckActiveNoiseShow->checkState());

    ui->InputActiveAnswerAzimuth->valueChanged(ui->InputActiveAnswerAzimuth->value());
    ui->InputActiveAnswerDistance->valueChanged(ui->InputActiveAnswerDistance->value());
    ui->CheckActiveAnswerShow->stateChanged(ui->CheckActiveAnswerShow->checkState());
    ui->CheckActiveInSyncShow->stateChanged(ui->CheckActiveInSyncShow->checkState());

    ui->ChangeLocatorState->clicked();
}

IndicatorDRL::~IndicatorDRL()
{
    delete ui;
}

/**
 * Этот метод является чистой воды диким шаманством
 */
bool IndicatorDRL::eventFilter(QObject *O, QEvent *E)
{
    if(O->inherits("Daddy") && E->type()==QEvent::MouseButtonDblClick)
    {
        if(isFullScreen())
        {
            ui->LayoutMainLocator->addWidget(ui->RenderMainLocator,0,0,1,1);
            ui->centralwidget->raise();
            showNormal();
        }
        else
        {
            ui->gridLayout_27->addWidget(ui->RenderMainLocator,0,0,0,0);
            ui->RenderMainLocator->raise();
            showFullScreen();
        }
        activateWindow();
    }
    return QMainWindow::eventFilter(O,E);
}

void IndicatorDRL::resizeEvent(QResizeEvent *E)
{
}

void IndicatorDRL::on_SelectAzimuthMarks_pressed()
{
    ui->SelectAzimuthMarks->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_SelectAzimuthMarks_released()
{
    static bool way=false;
    qint8 degree=0u;
    MainLocator::Azimuth a=ui->RenderMainLocator->GetCurrentAzimuthMode();
    if(a==MainLocator::Azimuth::A_NO)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentAzimuthMode(MainLocator::Azimuth::A_FIRST);
    }
    else if(a==MainLocator::Azimuth::A_FIRST)
    {
        if(way)
        {
            degree=-60;
            ui->RenderMainLocator->SetCurrentAzimuthMode(MainLocator::Azimuth::A_NO);
        }
        else
        {
            degree=60u;
            ui->RenderMainLocator->SetCurrentAzimuthMode(MainLocator::Azimuth::A_SECOND);
        }
        way=!way;
    }
    else if(a==MainLocator::Azimuth::A_SECOND)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentAzimuthMode(MainLocator::Azimuth::A_FIRST);
    }
    ui->SelectAzimuthMarks->setIcon(QIcon(degree==0u ? QPixmap(":/buttons/knob") : Daddy::RotateResourceImage(":/buttons/knob",degree)));
    ui->SelectAzimuthMarks->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_SelectRangeMarks_pressed()
{
    ui->SelectRangeMarks->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_SelectRangeMarks_released()
{
    static bool way=false;
    qint8 degree=0u;
    MainLocator::Range r=ui->RenderMainLocator->GetCurrentRangeMode();
    if(r==MainLocator::Range::R_NO)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentRangeMode(MainLocator::Range::R_FIRST);
    }
    else if(r==MainLocator::Range::R_FIRST)
    {
        if(way)
        {
            degree=-60;
            ui->RenderMainLocator->SetCurrentRangeMode(MainLocator::Range::R_NO);
        }
        else
        {
            degree=60u;
            ui->RenderMainLocator->SetCurrentRangeMode(MainLocator::Range::R_SECOND);
        }
        way=!way;
    }
    else if(r==MainLocator::Range::R_SECOND)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentRangeMode(MainLocator::Range::R_FIRST);
    }
    ui->SelectRangeMarks->setIcon(QIcon(degree==0u ? QPixmap(":/buttons/knob") : Daddy::RotateResourceImage(":/buttons/knob",degree)));
    ui->SelectRangeMarks->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_SelectScale_pressed()
{
    ui->SelectScale->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_SelectScale_released()
{
    static bool way=false;
    qint16 degree=0u;
    MainLocator::Scale s=ui->RenderMainLocator->GetCurrentScaleMode();
    if(s==MainLocator::Scale::S_SMALL)
    {
        degree=90u;
        ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_MIDDLE);
    }
    else if(s==MainLocator::Scale::S_MIDDLE)
    {
        if(way)
        {
            degree=0u;
            ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_SMALL);
        }
        else
        {
            degree=180u;
            ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_LARGE);
        }
        way=!way;
    }
    else if(s==MainLocator::Scale::S_LARGE)
    {
        degree=90u;
        ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_MIDDLE);
    }
    ui->SelectScale->setIcon(QIcon(degree==90u ? QPixmap(":/buttons/switch_base") : Daddy::RotateResourceImage(":/buttons/switch_up",degree)));
    ui->SelectScale->setCursor(Qt::OpenHandCursor);
    if(ui->InputScatterTrashFrom->value()>ui->RenderMainLocator->GetCurrentScaleMode())
        ui->InputScatterTrashFrom->setValue(ui->RenderMainLocator->GetCurrentScaleMode());
    if(ui->InputScatterTrashTo->value()>ui->RenderMainLocator->GetCurrentScaleMode())
        ui->InputScatterTrashTo->setValue(ui->RenderMainLocator->GetCurrentScaleMode());
    ui->InputScatterTrashFrom->setMaximum(ui->RenderMainLocator->GetCurrentScaleMode());
    ui->InputScatterTrashTo->setMaximum(ui->RenderMainLocator->GetCurrentScaleMode());
}

void IndicatorDRL::on_ChangeIndicatorBrightnessButton_pressed()
{
    ui->ChangeIndicatorBrightness->show();
    ui->ChangeIndicatorBrightness->setEnabled(true);
    ui->ChangeIndicatorBrightnessButton->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorBrightness_sliderPressed()
{
    ui->ChangeIndicatorBrightness->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorBrightness_sliderReleased()
{
    ui->ChangeIndicatorBrightness->hide();
    ui->ChangeIndicatorBrightness->setDisabled(true);
    ui->ChangeIndicatorBrightness->setCursor(Qt::OpenHandCursor);
    ui->ChangeIndicatorBrightnessButton->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorBrightness_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderMainLocator->SetSettings("system","brightness",static_cast<qreal>(value)/100);
    ui->ChangeIndicatorBrightnessButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeIndicatorBrightness->maximum())));
}

void IndicatorDRL::on_ChangeIndicatorLightningButton_pressed()
{
    ui->ChangeIndicatorLightning->show();
    ui->ChangeIndicatorLightning->setEnabled(true);
    ui->ChangeIndicatorLightningButton->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorLightning_sliderPressed()
{
    ui->ChangeIndicatorLightning->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorLightning_sliderReleased()
{
    ui->ChangeIndicatorLightning->hide();
    ui->ChangeIndicatorLightning->setDisabled(true);
    ui->ChangeIndicatorLightning->setCursor(Qt::OpenHandCursor);
    ui->ChangeIndicatorLightningButton->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorLightning_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderMainLocator->SetSettings("system","lightning",static_cast<qreal>(value)/100);
    ui->ChangeIndicatorLightningButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeIndicatorLightning->maximum())));
}

void IndicatorDRL::on_ChangeIndicatorFocusButton_pressed()
{
    ui->ChangeIndicatorFocus->show();
    ui->ChangeIndicatorFocus->setEnabled(true);
    ui->ChangeIndicatorFocusButton->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorFocus_sliderPressed()
{
    ui->ChangeIndicatorFocus->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorFocus_sliderReleased()
{
    ui->ChangeIndicatorFocus->hide();
    ui->ChangeIndicatorFocus->setDisabled(true);
    ui->ChangeIndicatorFocus->setCursor(Qt::OpenHandCursor);
    ui->ChangeIndicatorFocusButton->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorFocus_valueChanged(int value)
{
    ui->ChangeIndicatorFocusButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeIndicatorFocus->maximum())));
    value=value>=0 ? value+100 : 100-value;
    ui->RenderMainLocator->SetSettings("system","focus",static_cast<qreal>(value)/100);
}

void IndicatorDRL::on_ChangeIndicatorVARUButton_pressed()
{
    ui->ChangeIndicatorVARU->show();
    ui->ChangeIndicatorVARU->setEnabled(true);
    ui->ChangeIndicatorVARUButton->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorVARU_sliderPressed()
{
    ui->ChangeIndicatorVARU->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorVARU_sliderReleased()
{
    ui->ChangeIndicatorVARU->hide();
    ui->ChangeIndicatorVARU->setDisabled(true);
    ui->ChangeIndicatorVARU->setCursor(Qt::OpenHandCursor);
    ui->ChangeIndicatorVARUButton->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_ChangeIndicatorVARU_valueChanged(int value)
{
    ui->RenderMainLocator->SetSettings("system","varu",static_cast<qreal>(value)/100);
    ui->ChangeIndicatorVARUButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeIndicatorVARU->maximum())));
}

void IndicatorDRL::on_SelectWorkVariant_pressed()
{
    ui->SelectWorkVariant->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_SelectWorkVariant_released()
{
    static bool way=false;
    qint8 degree=0u;
    MainLocator::WorkMode wm=ui->RenderMainLocator->GetCurrentWorkMode();
    if(wm==MainLocator::WorkMode::WM_AKT)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_PASS);
        if(!ui->BoxTrashSettings->isEnabled())
            ui->BoxTrashSettings->setEnabled(true);
        if(!ui->BoxActiveTrashSettings->isEnabled())
            ui->BoxActiveTrashSettings->setEnabled(true);
        if(!ui->BoxActiveNoiseTrash->isEnabled())
            ui->BoxActiveNoiseTrash->setEnabled(true);

        ui->CheckShowMeteo->stateChanged(ui->CheckShowMeteo->checkState());
        ui->CheckShowLocalItems->stateChanged(ui->CheckShowLocalItems->checkState());
        ui->CheckActiveNoiseShow->stateChanged(ui->CheckActiveNoiseShow->checkState());
        ui->CheckActiveAnswerShow->stateChanged(ui->CheckActiveAnswerShow->checkState());
        ui->CheckActiveInSyncShow->stateChanged(ui->CheckActiveInSyncShow->checkState());
    }
    else if(wm==MainLocator::WorkMode::WM_PASS)
    {
        if(way)
        {
            degree=-60;
            ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_AKT);
            if(!ui->BoxActiveTrashSettings->isEnabled())
                ui->BoxActiveTrashSettings->setEnabled(true);
            if(!ui->BoxActiveTrashSettings->isEnabled())
                ui->BoxActiveTrashSettings->setEnabled(true);
            if(ui->BoxActiveNoiseTrash->isEnabled())
                ui->BoxActiveNoiseTrash->setEnabled(false);
            if(ui->BoxTrashSettings->isEnabled())
                ui->BoxTrashSettings->setEnabled(false);
            ui->CheckActiveAnswerShow->stateChanged(ui->CheckActiveAnswerShow->checkState());
            ui->CheckActiveInSyncShow->stateChanged(ui->CheckActiveInSyncShow->checkState());
        }
        else
        {
            degree=60u;
            ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_SDC);
            if(!ui->BoxActiveTrashSettings->isEnabled())
                ui->BoxActiveTrashSettings->setEnabled(true);
            if(!ui->BoxActiveTrashSettings->isEnabled())
                ui->BoxActiveTrashSettings->setEnabled(true);
            if(ui->BoxActiveNoiseTrash->isEnabled())
                ui->BoxActiveNoiseTrash->setEnabled(false);
            if(ui->BoxTrashSettings->isEnabled())
                ui->BoxTrashSettings->setEnabled(false);
            ui->CheckActiveAnswerShow->stateChanged(ui->CheckActiveAnswerShow->checkState());
            ui->CheckActiveInSyncShow->stateChanged(ui->CheckActiveInSyncShow->checkState());
        }
        way=!way;
    }
    else if(wm==MainLocator::WorkMode::WM_SDC)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_PASS);
        if(!ui->BoxTrashSettings->isEnabled())
            ui->BoxTrashSettings->setEnabled(true);
        if(!ui->BoxActiveTrashSettings->isEnabled())
            ui->BoxActiveTrashSettings->setEnabled(true);
        if(!ui->BoxActiveNoiseTrash->isEnabled())
            ui->BoxActiveNoiseTrash->setEnabled(true);
        ui->CheckShowMeteo->stateChanged(ui->CheckShowMeteo->checkState());
        ui->CheckShowLocalItems->stateChanged(ui->CheckShowLocalItems->checkState());
        ui->CheckActiveNoiseShow->stateChanged(ui->CheckActiveNoiseShow->checkState());
        ui->CheckActiveAnswerShow->stateChanged(ui->CheckActiveAnswerShow->checkState());
        ui->CheckActiveInSyncShow->stateChanged(ui->CheckActiveInSyncShow->checkState());
    }
    ui->SelectWorkVariant->setIcon(QIcon(degree==0u ? QPixmap(":/buttons/knob") : Daddy::RotateResourceImage(":/buttons/knob",degree)));
    ui->SelectWorkVariant->setCursor(Qt::OpenHandCursor);
}

void IndicatorDRL::on_ChangeTrashIntensityButton_pressed()
{
    ui->ChangeTrashIntensity->show();
    ui->ChangeTrashIntensity->setEnabled(true);
    ui->ChangeTrashIntensityButton->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeTrashIntensity_sliderPressed()
{
    ui->ChangeTrashIntensity->setCursor(Qt::ClosedHandCursor);
}

void IndicatorDRL::on_ChangeTrashIntensity_sliderReleased()
{
    ui->ChangeTrashIntensity->hide();
    ui->ChangeTrashIntensity->setDisabled(true);
    ui->ChangeTrashIntensity->setCursor(Qt::OpenHandCursor);
    ui->ChangeTrashIntensityButton->setCursor(Qt::OpenHandCursor);
    //---------------------------
    ui->RenderMainLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTrashIntensity->value()));
}

void IndicatorDRL::on_ChangeTrashIntensity_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeTrashIntensityButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeTrashIntensity->maximum())));
}

void IndicatorDRL::on_InputScatterTrashFrom_valueChanged(double arg1)
{
    qreal from=static_cast<qreal>(arg1),
          to=static_cast<qreal>(ui->InputScatterTrashTo->value());
    if(from>=to)
        ui->InputScatterTrashFrom->setMaximum(to);
    ui->InputScatterTrashTo->setMinimum(from);
    ui->RenderMainLocator->SetSettings("trash","begin",from);
}

void IndicatorDRL::on_InputScatterTrashTo_valueChanged(double arg1)
{
    qreal from=static_cast<qreal>(ui->InputScatterTrashFrom->value()),
          to=static_cast<qreal>(arg1);
    if(to<=from)
        ui->InputScatterTrashTo->setMinimum(from);
    ui->InputScatterTrashFrom->setMaximum(to);
    ui->RenderMainLocator->SetSettings("trash","end",to);
}

void IndicatorDRL::on_CheckShowLocalItems_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("local_items","show",arg1==2);
}

void IndicatorDRL::on_CheckShowMeteo_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("meteo","show",arg1==2);
}

void IndicatorDRL::on_RegenerateTrash_clicked()
{
    ui->RenderMainLocator->GenerationTrash();
    ui->RenderMainLocator->GenerationMeteo();
}

void IndicatorDRL::on_InputActiveNoiseAzimuth_valueChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_noise_trash","azimuth",static_cast<quint16>(arg1));
}

void IndicatorDRL::on_SelectActiveNoiseIntensity_currentIndexChanged(int index)
{
    ui->RenderMainLocator->SetSettings("active_noise_trash","intensity",static_cast<quint16>(index));
}

void IndicatorDRL::on_CheckActiveNoiseShow_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_noise_trash","show",arg1==2);
}

void IndicatorDRL::on_InputActiveAnswerAzimuth_valueChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_answer_trash","azimuth",static_cast<quint16>(arg1));
}

void IndicatorDRL::on_InputActiveAnswerDistance_valueChanged(double arg1)
{
    ui->RenderMainLocator->SetSettings("active_answer_trash","distance",static_cast<qreal>(arg1));
}

void IndicatorDRL::on_CheckActiveAnswerShow_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_answer_trash","show",arg1==2);
}

void IndicatorDRL::on_CheckActiveInSyncShow_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_insync_trash","show",arg1==2);
}

void IndicatorDRL::on_ChangeViewStateAll_clicked()
{
    if(ui->RenderMainLocator->IsAllVisible())
    {
        ui->ChangeViewStateAll->setText("Отобразить все\nскрытые метки");
        ui->RenderMainLocator->SetAllVisible(false);
    }
    else
    {
        ui->ChangeViewStateAll->setText("Вернуть состояние\nскрытых меток");
        ui->RenderMainLocator->SetAllVisible(true);
    }
}

void IndicatorDRL::on_ChangeLocatorState_clicked()
{
    if(ui->RenderMainLocator->IsActive())
    {
        ui->RenderMainLocator->ChangeFPS(0u);
        ui->ChangeLocatorState->setText("Продолжить");
    }
    else
    {
        ui->RenderMainLocator->ChangeFPS(static_cast<qreal>(1000)/24);
        ui->ChangeLocatorState->setText("Стоп");
    }
}

void IndicatorDRL::on_SetTargetsSettings_clicked()
{
    TS=new TargetsSettings;
    TS->show();
}
