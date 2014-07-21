#include"rspview.h"
#include"ui_rspview.h"
#include<QDebug>

RSPView::RSPView(QWidget *parent) : QMainWindow(parent),ui(new Ui::RSPView)
{
    ui->setupUi(this);

    Settings.main_scan_amp=ui->ChangeMainScanAmp->value();
    Settings.main_scan_equa=ui->ChangeMainScanEqua->value();
    Settings.main_offset_vertical=ui->ChangeMainOffsetVertical->value();
    Settings.main_offset_horizontal=ui->ChangeMainOffsetHorizontal->value();
    Settings.main_brightness_range=ui->ChangeMainBrightnessRange->value();
    Settings.main_brightness_azimuth=ui->ChangeMainBrightnessAzimuth->value();
    Settings.main_focus=ui->ChangeMainFocus->value();
    Settings.main_focus_brightness=ui->ChangeMainFocusBrightness->value();
    Settings.main_lightning=ui->ChangeMainLightning->value();
    Settings.main_trash_akt=ui->ChangeMainTrashAKT->value();
    Settings.main_trash_pass=ui->ChangeMainTrashPASS->value();

    Settings.top_focus=ui->ChangeTopFocus->value();
    Settings.top_brightness=ui->ChangeTopBrightness->value();
    Settings.top_lightning=ui->ChangeTopLightning->value();
    Settings.top_trash_sdc=ui->ChangeTopTrashSDC->value();
    Settings.top_trash_pass=ui->ChangeTopTrashPASS->value();
    Settings.top_trash_akt=ui->ChangeTopTrashAKT->value();
    Settings.top_scan_amp_vertical=ui->ChangeTopScanAmpVertical->value();
    Settings.top_scan_amp_horizontal=ui->ChangeTopScanAmpHorizontal->value();
    Settings.top_offset_vertical=ui->ChangeTopOffsetVertical->value();
    Settings.top_offset_horizontal=ui->ChangeTopOffsetHorizontal->value();

    Settings.right_focus=ui->ChangeRightFocus->value();
    Settings.right_focus_brightness=ui->ChangeRightFocusBrightness->value();
    Settings.right_lightning=ui->ChangeRightLightning->value();
    Settings.right_scan_amp_vertical=ui->ChangeRightScanAmpVertical->value();
    Settings.right_scan_amp_horizontal=ui->ChangeRightScanAmpHorizontal->value();
    Settings.right_offset_vertical=ui->ChangeRightOffsetVertical->value();
    Settings.right_offset_horizontal=ui->ChangeRightOffsetHorizontal->value();
    Settings.right_brightness_range=ui->ChangeRightBrightnessRange->value();
    Settings.right_brightness_azimuth=ui->ChangeRightBrightnessAzimuth->value();

    ui->RenderMainLocator->SetCurrentRangeMode(MainLocator::Range::R_FIRST);
    ui->RenderMainLocator->SetCurrentAzimuthMode(MainLocator::Azimuth::A_FIRST);
    ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_MIDDLE);

    ui->RenderMainLocator->SetSettings("trash","begin",.0f);
    ui->RenderMainLocator->SetSettings("trash","end",static_cast<qreal>(ui->RenderMainLocator->GetCurrentScaleMode()));
    ui->CheckShowLocalItems->stateChanged(ui->CheckShowLocalItems->checkState());
    ui->CheckShowMeteo->stateChanged(ui->CheckShowMeteo->checkState());

    ui->RenderTopTriangleLocator->SetCurrentRangeMode(TopTriangleLocator::Range::R_FIRST);
    ui->RenderTopTriangleLocator->SetCurrentScaleMode(TopTriangleLocator::Scale::S_LARGE);
    ui->RenderTopTriangleLocator->SetCurrentWorkMode(TopTriangleLocator::WorkMode::WM_COMMON);
    ui->RenderTopTriangleLocator->SetCurrentAzimuthMode(TopTriangleLocator::Azimuth::A_FIRST);

    ui->RenderTopTriangleLocator->SetSettings("trash","begin",.0f);
    ui->RenderTopTriangleLocator->SetSettings("trash","end",static_cast<qreal>(ui->RenderTopTriangleLocator->GetCurrentScaleMode()));

    ui->RenderRightTriangleLocator->SetCurrentRangeMode(RightTriangleLocator::Range::R_FIRST);
    ui->RenderRightTriangleLocator->SetCurrentScaleMode(RightTriangleLocator::Scale::S_LARGE);
    ui->RenderRightTriangleLocator->SetCurrentWorkMode(RightTriangleLocator::WorkMode::WM_COMMON);
    ui->RenderRightTriangleLocator->SetCurrentAzimuthMode(RightTriangleLocator::Azimuth::A_FIRST);

    ui->RenderRightTriangleLocator->SetSettings("trash","begin",.0f);
    ui->RenderRightTriangleLocator->SetSettings("trash","end",static_cast<qreal>(ui->RenderRightTriangleLocator->GetCurrentScaleMode()));

    ui->ChangeMainScanAmp->hide();
    ui->ChangeMainScanEqua->hide();
    ui->ChangeMainOffsetVertical->hide();
    ui->ChangeMainOffsetHorizontal->hide();
    ui->ChangeMainBrightnessRange->hide();
    ui->ChangeMainBrightnessAzimuth->hide();
    ui->ChangeMainNullSetVertical->hide();
    ui->ChangeMainNullSetHorizontal->hide();
    ui->ChangeMainFocus->hide();
    ui->ChangeMainFocusBrightness->hide();
    ui->ChangeMainTrashAKT->hide();
    ui->ChangeMainTrashPASS->hide();
    //ui->ChangeMainLocatorState->hide();
    //-----------------------------
    ui->ChangeMainLightning->hide();
    ui->ChangeMainLightningButton->hide();
    ui->LabelMainLightning->hide();

    ui->ChangeTopScanAmpVertical->hide();
    ui->ChangeTopScanAmpHorizontal->hide();
    ui->ChangeTopOffsetVertical->hide();
    ui->ChangeTopOffsetHorizontal->hide();
    ui->ChangeTopDirectionTrack->hide();
    ui->ChangeTopDirectionGlide->hide();
    ui->ChangeTopFocus->hide();
    ui->ChangeTopBrightness->hide();
    ui->ChangeTopTrashSDC->hide();
    ui->ChangeTopTrashPASS->hide();
    ui->ChangeTopTrashAKT->hide();
    //ui->ChangeTopState->hide();
    //-----------------------------
    ui->ChangeTopLightning->hide();
    ui->ChangeTopLightningButton->hide();
    ui->LabelTopLightning->hide();

    ui->ChangeRightScanAmpVertical->hide();
    ui->ChangeRightScanAmpHorizontal->hide();
    ui->ChangeRightOffsetVertical->hide();
    ui->ChangeRightOffsetHorizontal->hide();
    ui->ChangeRightDirectionTrack->hide();
    ui->ChangeRightDirectionGlide->hide();
    ui->ChangeRightBrightnessRange->hide();
    ui->ChangeRightBrightnessAzimuth->hide();
    ui->ChangeRightFocus->hide();
    ui->ChangeRightFocusBrightness->hide();
    //ui->ChangeRightState->hide();
    //-----------------------------
    ui->ChangeRightLightning->hide();
    ui->ChangeRightLightningButton->hide();
    ui->LabelRightLightning->hide();

    ui->ChangeMainScanAmp->valueChanged(ui->ChangeMainScanAmp->value());
    ui->ChangeMainScanEqua->valueChanged(ui->ChangeMainScanEqua->value());
    ui->ChangeMainOffsetVertical->valueChanged(ui->ChangeMainOffsetVertical->value());
    ui->ChangeMainOffsetHorizontal->valueChanged(ui->ChangeMainOffsetHorizontal->value());
    ui->ChangeMainBrightnessRange->valueChanged(ui->ChangeMainBrightnessRange->value());
    ui->ChangeMainBrightnessAzimuth->valueChanged(ui->ChangeMainBrightnessAzimuth->value());
    ui->ChangeMainNullSetVertical->valueChanged(ui->ChangeMainNullSetVertical->value());
    ui->ChangeMainNullSetHorizontal->valueChanged(ui->ChangeMainNullSetHorizontal->value());
    ui->LabelMainNullSet->hide();
    ui->LabelMainNullSetHorizontal->hide();
    ui->LabelMainNullSetVertical->hide();
    ui->ChangeMainNullSetVerticalButton->hide();
    ui->ChangeMainNullSetHorizontalButton->hide();

    ui->ChangeMainFocus->valueChanged(ui->ChangeMainFocus->value());
    ui->ChangeMainFocusBrightness->valueChanged(ui->ChangeMainFocusBrightness->value());
    ui->ChangeMainTrashAKT->valueChanged(ui->ChangeMainTrashAKT->value());
    ui->ChangeMainTrashAKT->sliderReleased();
    ui->ChangeMainTrashPASS->valueChanged(ui->ChangeMainTrashPASS->value());
    ui->ChangeMainTrashPASS->sliderReleased();

    ui->ChangeTopScanAmpVertical->valueChanged(ui->ChangeTopScanAmpVertical->value());
    ui->ChangeTopScanAmpHorizontal->valueChanged(ui->ChangeTopScanAmpHorizontal->value());
    ui->ChangeTopOffsetVertical->valueChanged(ui->ChangeTopOffsetVertical->value());
    ui->ChangeTopOffsetHorizontal->valueChanged(ui->ChangeTopOffsetHorizontal->value());
    ui->ChangeTopDirectionTrack->valueChanged(ui->ChangeTopDirectionTrack->value());
    ui->ChangeTopDirectionGlide->valueChanged(ui->ChangeTopDirectionGlide->value());
    ui->LabelTopDirection->hide();
    ui->LabelTopDirectionGlide->hide();
    ui->LabelTopDirectionTrack->hide();
    ui->ChangeTopDirectionTrackButton->hide();
    ui->ChangeTopDirectionGlideButton->hide();
    ui->ChangeTopFocus->valueChanged(ui->ChangeTopFocus->value());
    ui->ChangeTopBrightness->valueChanged(ui->ChangeTopBrightness->value());
    ui->ChangeTopTrashSDC->valueChanged(ui->ChangeTopTrashSDC->value());
    ui->ChangeTopTrashSDC->sliderReleased();
    ui->ChangeTopTrashPASS->valueChanged(ui->ChangeTopTrashPASS->value());
    ui->ChangeTopTrashPASS->sliderReleased();
    ui->ChangeTopTrashAKT->valueChanged(ui->ChangeTopTrashAKT->value());
    ui->ChangeTopTrashAKT->sliderReleased();

    ui->ChangeRightScanAmpVertical->valueChanged(ui->ChangeRightScanAmpVertical->value());
    ui->ChangeRightScanAmpHorizontal->valueChanged(ui->ChangeRightScanAmpHorizontal->value());
    ui->ChangeRightOffsetVertical->valueChanged(ui->ChangeRightOffsetVertical->value());
    ui->ChangeRightOffsetHorizontal->valueChanged(ui->ChangeRightOffsetHorizontal->value());
    ui->ChangeRightDirectionTrack->valueChanged(ui->ChangeRightDirectionTrack->value());
    ui->ChangeRightDirectionGlide->valueChanged(ui->ChangeRightDirectionGlide->value());
    ui->LabelRightDirection->hide();
    ui->LabelRightDirectionTrack->hide();
    ui->LabelRightDirectionGlide->hide();
    ui->ChangeRightDirectionTrackButton->hide();
    ui->ChangeRightDirectionGlideButton->hide();
    ui->ChangeRightBrightnessRange->valueChanged(ui->ChangeRightBrightnessRange->value());
    ui->ChangeRightBrightnessAzimuth->valueChanged(ui->ChangeRightBrightnessAzimuth->value());
    ui->ChangeRightFocus->valueChanged(ui->ChangeRightFocus->value());
    ui->ChangeRightFocusBrightness->valueChanged(ui->ChangeRightFocusBrightness->value());

    ui->ChangeMainLightning->valueChanged(ui->ChangeMainLightning->value());
    ui->ChangeTopLightning->valueChanged(ui->ChangeTopLightning->value());
    ui->ChangeRightLightning->valueChanged(ui->ChangeRightLightning->value());

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

    ui->ChangeMainLocatorState->clicked();
    ui->ChangeTopState->clicked();
    ui->ChangeRightState->clicked();
}

RSPView::~RSPView()
{
    delete ui;
}

/**
 * Этот метод является чистой воды диким шаманством
 */
bool RSPView::eventFilter(QObject *O, QEvent *E)
{
    if(O->inherits("Daddy") && E->type()==QEvent::MouseButtonDblClick)
    {
        if(isFullScreen())
        {
            ui->gridLayout->addWidget(ui->RenderMainLocator,0,0,1,1);
            ui->gridLayout_2->addWidget(ui->RenderTopTriangleLocator,0,0,1,1);
            ui->gridLayout_3->addWidget(ui->RenderRightTriangleLocator,0,0,1,1);

            ui->centralwidget->raise();
            showNormal();
        }
        else
        {
            if(O->objectName()=="RenderTopTriangleLocator" && O->inherits("TopTriangleLocator"))
            {
                ui->gridLayout_80->addWidget(ui->RenderTopTriangleLocator,0,0,0,0);
                ui->RenderTopTriangleLocator->raise();
            }
            else if(O->objectName()=="RenderRightTriangleLocator" && O->inherits("RightTriangleLocator"))
            {
                ui->gridLayout_80->addWidget(ui->RenderRightTriangleLocator,0,0,0,0);
                ui->RenderRightTriangleLocator->raise();
            }
            else
            {
                ui->gridLayout_80->addWidget(ui->RenderMainLocator,0,0,0,0);
                ui->RenderMainLocator->raise();
                showFullScreen();
            }
            showFullScreen();
        }
        activateWindow();
    }
    return QMainWindow::eventFilter(O,E);
}

void RSPView::on_ChangeMainScanAmpButton_pressed()
{
    ui->ChangeMainScanAmp->show();
    ui->ChangeMainScanAmp->setEnabled(true);
    ui->ChangeMainScanAmpButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainScanAmp_sliderPressed()
{
    ui->ChangeMainScanAmp->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainScanAmp_sliderReleased()
{
    ui->ChangeMainScanAmp->hide();
    ui->ChangeMainScanAmp->setDisabled(true);
    ui->ChangeMainScanAmp->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainScanAmpButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainScanAmp_valueChanged(int value)
{
    //quint16 max=ui->ChangeMainScanAmp->maximum(),
    //        min=ui->ChangeMainScanAmp->minimum();
    //if(value==min || value==max)
    //    return;
    //qreal val=static_cast<qreal>(value)/100;
    //ui->RenderMainLocator->SetSettings("scan","amplitude",val>1 ? (val-static_cast<qreal>(max-min)/100) : val);
    ui->RenderMainLocator->SetSettings("scan","amplitude",static_cast<qreal>(value)/100);
    ui->ChangeMainScanAmpButton->setIcon(QIcon(value%100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeMainScanAmp->maximum())));
}

void RSPView::on_ChangeMainScanEquaButton_pressed()
{
    ui->ChangeMainScanEqua->show();
    ui->ChangeMainScanEqua->setEnabled(true);
    ui->ChangeMainScanEquaButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainScanEqua_sliderPressed()
{
    ui->ChangeMainScanEqua->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainScanEqua_sliderReleased()
{
    ui->ChangeMainScanEqua->hide();
    ui->ChangeMainScanEqua->setDisabled(true);
    ui->ChangeMainScanEqua->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainScanEquaButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainScanEqua_valueChanged(int value)
{
    if(value==0)
        return;
    ui->RenderMainLocator->SetSettings("scan","equality",static_cast<qreal>(value)/100);
    ui->ChangeMainScanEquaButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeMainScanEqua->maximum())));
}

void RSPView::on_ChangeMainOffsetVerticalButton_pressed()
{
    ui->ChangeMainOffsetVertical->show();
    ui->ChangeMainOffsetVertical->setEnabled(true);
    ui->ChangeMainOffsetVerticalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainOffsetVertical_sliderPressed()
{
    ui->ChangeMainOffsetVertical->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainOffsetVertical_sliderReleased()
{
    ui->ChangeMainOffsetVertical->hide();
    ui->ChangeMainOffsetVertical->setDisabled(true);
    ui->ChangeMainOffsetVertical->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainOffsetVerticalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainOffsetVertical_valueChanged(int value)
{
    ui->RenderMainLocator->SetSettings("offset","vertical",static_cast<qreal>(value)/100);
    ui->ChangeMainOffsetVerticalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeMainOffsetVertical->maximum())));
}

void RSPView::on_ChangeMainOffsetHorizontalButton_pressed()
{
    ui->ChangeMainOffsetHorizontal->show();
    ui->ChangeMainOffsetHorizontal->setEnabled(true);
    ui->ChangeMainOffsetHorizontalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainOffsetHorizontal_sliderPressed()
{
    ui->ChangeMainOffsetHorizontal->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainOffsetHorizontal_sliderReleased()
{
    ui->ChangeMainOffsetHorizontal->hide();
    ui->ChangeMainOffsetHorizontal->setDisabled(true);
    ui->ChangeMainOffsetHorizontal->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainOffsetHorizontalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainOffsetHorizontal_valueChanged(int value)
{
    ui->RenderMainLocator->SetSettings("offset","horizontal",static_cast<qreal>(value)/100);
    ui->ChangeMainOffsetHorizontalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeMainOffsetHorizontal->maximum())));
}

void RSPView::on_ChangeMainBrightnessRangeButton_pressed()
{
    ui->ChangeMainBrightnessRange->show();
    ui->ChangeMainBrightnessRange->setEnabled(true);
    ui->ChangeMainBrightnessRangeButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainBrightnessRange_sliderPressed()
{
    ui->ChangeMainBrightnessRange->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainBrightnessRange_sliderReleased()
{
    ui->ChangeMainBrightnessRange->hide();
    ui->ChangeMainBrightnessRange->setDisabled(true);
    ui->ChangeMainBrightnessRange->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainBrightnessRangeButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainBrightnessRange_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderMainLocator->SetSettings("brightness","range",static_cast<qreal>(value)/100);
    ui->ChangeMainBrightnessRangeButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeMainBrightnessRange->maximum())));
}

void RSPView::on_ChangeMainBrightnessAzimuthButton_pressed()
{
    ui->ChangeMainBrightnessAzimuth->show();
    ui->ChangeMainBrightnessAzimuth->setEnabled(true);
    ui->ChangeMainBrightnessAzimuthButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainBrightnessAzimuth_sliderPressed()
{
    ui->ChangeMainBrightnessAzimuth->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainBrightnessAzimuth_sliderReleased()
{
    ui->ChangeMainBrightnessAzimuth->hide();
    ui->ChangeMainBrightnessAzimuth->setDisabled(true);
    ui->ChangeMainBrightnessAzimuth->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainBrightnessAzimuthButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainBrightnessAzimuth_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderMainLocator->SetSettings("brightness","azimuth",static_cast<qreal>(value)/100);
    ui->ChangeMainBrightnessAzimuthButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeMainBrightnessAzimuth->maximum())));
}

void RSPView::on_ChangeMainNullSetVerticalButton_pressed()
{
    ui->ChangeMainNullSetVertical->show();
    ui->ChangeMainNullSetVertical->setEnabled(true);
    ui->ChangeMainNullSetVerticalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainNullSetVertical_sliderPressed()
{
    ui->ChangeMainNullSetVertical->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainNullSetVertical_sliderReleased()
{
    ui->ChangeMainNullSetVertical->hide();
    ui->ChangeMainNullSetVertical->setDisabled(true);
    ui->ChangeMainNullSetVertical->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainNullSetVerticalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainNullSetVertical_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeMainNullSetVerticalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeMainNullSetVertical->maximum())));
}

void RSPView::on_ChangeMainNullSetHorizontalButton_pressed()
{
    ui->ChangeMainNullSetHorizontal->show();
    ui->ChangeMainNullSetHorizontal->setEnabled(true);
    ui->ChangeMainNullSetHorizontalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainNullSetHorizontal_sliderPressed()
{
    ui->ChangeMainNullSetHorizontal->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainNullSetHorizontal_sliderReleased()
{
    ui->ChangeMainNullSetHorizontal->hide();
    ui->ChangeMainNullSetHorizontal->setDisabled(true);
    ui->ChangeMainNullSetHorizontal->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainNullSetHorizontalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainNullSetHorizontal_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeMainNullSetHorizontalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeMainNullSetHorizontal->maximum())));
}

void RSPView::on_ChangeMainFocusButton_pressed()
{
    ui->ChangeMainFocus->show();
    ui->ChangeMainFocus->setEnabled(true);
    ui->ChangeMainFocusButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainFocus_sliderPressed()
{
    ui->ChangeMainFocus->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainFocus_sliderReleased()
{
    ui->ChangeMainFocus->hide();
    ui->ChangeMainFocus->setDisabled(true);
    ui->ChangeMainFocus->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainFocusButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainFocus_valueChanged(int value)
{
    ui->ChangeMainFocusButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeMainFocus->maximum())));
    value=value>=0 ? value+100 : 100-value;
    ui->RenderMainLocator->SetSettings("system","focus",static_cast<qreal>(value)/100);
}

void RSPView::on_ChangeMainFocusBrightnessButton_pressed()
{
    ui->ChangeMainFocusBrightness->show();
    ui->ChangeMainFocusBrightness->setEnabled(true);
    ui->ChangeMainFocusBrightnessButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainFocusBrightness_sliderPressed()
{
    ui->ChangeMainFocusBrightness->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainFocusBrightness_sliderReleased()
{
    ui->ChangeMainFocusBrightness->hide();
    ui->ChangeMainFocusBrightness->setDisabled(true);
    ui->ChangeMainFocusBrightness->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainFocusBrightnessButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeMainFocusBrightness_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderMainLocator->SetSettings("system","brightness",static_cast<qreal>(value)/100);
    ui->ChangeMainFocusBrightnessButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeMainFocusBrightness->maximum())));
}

void RSPView::on_ChangeMainTrashAKTButton_pressed()
{
    ui->ChangeMainTrashAKT->show();
    ui->ChangeMainTrashAKT->setEnabled(true);
    ui->ChangeMainTrashAKTButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainTrashAKT_sliderPressed()
{
    ui->ChangeMainTrashAKT->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainTrashAKT_sliderReleased()
{
    ui->ChangeMainTrashAKT->hide();
    ui->ChangeMainTrashAKT->setDisabled(true);
    ui->ChangeMainTrashAKT->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainTrashAKTButton->setCursor(Qt::OpenHandCursor);
    MainLocator::WorkMode wm=ui->RenderMainLocator->GetCurrentWorkMode();
    if(wm!=MainLocator::WorkMode::WM_AKT)
        return;
    ui->RenderMainLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeMainTrashAKT->value()));
}

void RSPView::on_ChangeMainTrashAKT_valueChanged(int value)
{
    if(value<0)
        return;
    qint8 degree=0u;
    ui->ChangeMainTrashAKTButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeMainTrashAKT->maximum())));
}

void RSPView::on_ChangeMainTrashPASSButton_pressed()
{
    ui->ChangeMainTrashPASS->show();
    ui->ChangeMainTrashPASS->setEnabled(true);
    ui->ChangeMainTrashPASSButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainTrashPASS_sliderPressed()
{
    ui->ChangeMainTrashPASS->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeMainTrashPASS_sliderReleased()
{
    ui->ChangeMainTrashPASS->hide();
    ui->ChangeMainTrashPASS->setDisabled(true);
    ui->ChangeMainTrashPASS->setCursor(Qt::OpenHandCursor);
    ui->ChangeMainTrashPASSButton->setCursor(Qt::OpenHandCursor);
    MainLocator::WorkMode wm=ui->RenderMainLocator->GetCurrentWorkMode();
    if(wm==MainLocator::WorkMode::WM_AKT)
        return;
    ui->RenderMainLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeMainTrashPASS->value()));
}

void RSPView::on_ChangeMainTrashPASS_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeMainTrashPASSButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeMainTrashPASS->maximum())));
}

void RSPView::on_SelectMainScale_pressed()
{
    ui->SelectMainScale->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_SelectMainScale_released()
{
    static bool way=false;
    qint16 degree=0u;
    MainLocator::Scale s=ui->RenderMainLocator->GetCurrentScaleMode();
    if(s==MainLocator::Scale::S_SMALL)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_MIDDLE);
    }
    else if(s==MainLocator::Scale::S_MIDDLE)
    {
        if(way)
        {
            degree=-60;
            ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_SMALL);
        }
        else
        {
            degree=60u;
            ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_LARGE);
        }
        way=!way;
    }
    else if(s==MainLocator::Scale::S_LARGE)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentScaleMode(MainLocator::Scale::S_MIDDLE);
    }

    ui->RenderMainLocator->SetSettings("trash","begin",.0f);
    ui->RenderMainLocator->SetSettings("trash","end",static_cast<qreal>(ui->RenderMainLocator->GetCurrentScaleMode()));

    ui->SelectMainScale->setIcon(QIcon(degree==0u ? QPixmap(":/buttons/knob") : Daddy::RotateResourceImage(":/buttons/knob",degree)));
    ui->SelectMainScale->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopScanAmpVerticalButton_pressed()
{
    ui->ChangeTopScanAmpVertical->show();
    ui->ChangeTopScanAmpVertical->setEnabled(true);
    ui->ChangeTopScanAmpVerticalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopScanAmpVertical_sliderPressed()
{
    ui->ChangeTopScanAmpVertical->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopScanAmpVertical_sliderReleased()
{
    ui->ChangeTopScanAmpVertical->hide();
    ui->ChangeTopScanAmpVertical->setDisabled(true);
    ui->ChangeTopScanAmpVertical->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopScanAmpVerticalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopScanAmpVertical_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderTopTriangleLocator->SetSettings("amplitude","vertical",static_cast<qreal>(value)/100);
    ui->ChangeTopScanAmpVerticalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeTopScanAmpVertical->maximum())));
}

void RSPView::on_ChangeTopScanAmpHorizontalButton_pressed()
{
    ui->ChangeTopScanAmpHorizontal->show();
    ui->ChangeTopScanAmpHorizontal->setEnabled(true);
    ui->ChangeTopScanAmpHorizontalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopScanAmpHorizontal_sliderPressed()
{
    ui->ChangeTopScanAmpHorizontal->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopScanAmpHorizontal_sliderReleased()
{
    ui->ChangeTopScanAmpHorizontal->hide();
    ui->ChangeTopScanAmpHorizontal->setDisabled(true);
    ui->ChangeTopScanAmpHorizontal->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopScanAmpHorizontalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopScanAmpHorizontal_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderTopTriangleLocator->SetSettings("amplitude","horizontal",static_cast<qreal>(value)/100);
    ui->ChangeTopScanAmpHorizontalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeTopScanAmpHorizontal->maximum())));
}

void RSPView::on_ChangeTopOffsetVerticalButton_pressed()
{
    ui->ChangeTopOffsetVertical->show();
    ui->ChangeTopOffsetVertical->setEnabled(true);
    ui->ChangeTopOffsetVerticalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopOffsetVertical_sliderPressed()
{
    ui->ChangeTopOffsetVertical->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopOffsetVertical_sliderReleased()
{
    ui->ChangeTopOffsetVertical->hide();
    ui->ChangeTopOffsetVertical->setDisabled(true);
    ui->ChangeTopOffsetVertical->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopOffsetVerticalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopOffsetVertical_valueChanged(int value)
{
    ui->RenderTopTriangleLocator->SetSettings("offset","vertical",static_cast<qreal>(value)/100);
    ui->ChangeTopOffsetVerticalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeTopOffsetVertical->maximum())));
}

void RSPView::on_ChangeTopOffsetHorizontalButton_pressed()
{
    ui->ChangeTopOffsetHorizontal->show();
    ui->ChangeTopOffsetHorizontal->setEnabled(true);
    ui->ChangeTopOffsetHorizontalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopOffsetHorizontal_sliderPressed()
{
    ui->ChangeTopOffsetHorizontal->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopOffsetHorizontal_sliderReleased()
{
    ui->ChangeTopOffsetHorizontal->hide();
    ui->ChangeTopOffsetHorizontal->setDisabled(true);
    ui->ChangeTopOffsetHorizontal->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopOffsetHorizontalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopOffsetHorizontal_valueChanged(int value)
{
    ui->RenderTopTriangleLocator->SetSettings("offset","horizontal",static_cast<qreal>(value)/100);
    ui->ChangeTopOffsetHorizontalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeTopOffsetHorizontal->maximum())));
}

void RSPView::on_ChangeTopDirectionTrackButton_pressed()
{
    ui->ChangeTopDirectionTrack->show();
    ui->ChangeTopDirectionTrack->setEnabled(true);
    ui->ChangeTopDirectionTrackButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopDirectionTrack_sliderPressed()
{
    ui->ChangeTopDirectionTrack->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopDirectionTrack_sliderReleased()
{
    ui->ChangeTopDirectionTrack->hide();
    ui->ChangeTopDirectionTrack->setDisabled(true);
    ui->ChangeTopDirectionTrack->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopDirectionTrackButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopDirectionTrack_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeTopDirectionTrackButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeTopDirectionTrack->maximum())));
}

void RSPView::on_ChangeTopDirectionGlideButton_pressed()
{
    ui->ChangeTopDirectionGlide->show();
    ui->ChangeTopDirectionGlide->setEnabled(true);
    ui->ChangeTopDirectionGlideButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopDirectionGlide_sliderPressed()
{
    ui->ChangeTopDirectionGlide->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopDirectionGlide_sliderReleased()
{
    ui->ChangeTopDirectionGlide->hide();
    ui->ChangeTopDirectionGlide->setDisabled(true);
    ui->ChangeTopDirectionGlide->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopDirectionGlideButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopDirectionGlide_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeTopDirectionGlideButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeTopDirectionGlide->maximum())));
}

void RSPView::on_ChangeTopFocusButton_pressed()
{
    ui->ChangeTopFocus->show();
    ui->ChangeTopFocus->setEnabled(true);
    ui->ChangeTopFocusButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopFocus_sliderPressed()
{
    ui->ChangeTopFocus->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopFocus_sliderReleased()
{
    ui->ChangeTopFocus->hide();
    ui->ChangeTopFocus->setDisabled(true);
    ui->ChangeTopFocus->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopFocusButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopFocus_valueChanged(int value)
{
    ui->ChangeTopFocusButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeTopFocus->maximum())));
    value=value>=0 ? value+100 : 100-value;
    ui->RenderTopTriangleLocator->SetSettings("system","focus",static_cast<qreal>(value)/100);
}

void RSPView::on_ChangeTopBrightnessButton_pressed()
{
    ui->ChangeTopBrightness->show();
    ui->ChangeTopBrightness->setEnabled(true);
    ui->ChangeTopBrightnessButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopBrightness_sliderPressed()
{
    ui->ChangeTopBrightness->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopBrightness_sliderReleased()
{
    ui->ChangeTopBrightness->hide();
    ui->ChangeTopBrightness->setDisabled(true);
    ui->ChangeTopBrightness->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopBrightnessButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeTopBrightness_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderTopTriangleLocator->SetSettings("system","brightness",static_cast<qreal>(value)/100);
    ui->ChangeTopBrightnessButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeTopBrightness->maximum())));
}

void RSPView::on_ChangeTopTrashSDCButton_pressed()
{
    ui->ChangeTopTrashSDC->show();
    ui->ChangeTopTrashSDC->setEnabled(true);
    ui->ChangeTopTrashSDCButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopTrashSDC_sliderPressed()
{
    ui->ChangeTopTrashSDC->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopTrashSDC_sliderReleased()
{
    ui->ChangeTopTrashSDC->hide();
    ui->ChangeTopTrashSDC->setDisabled(true);
    ui->ChangeTopTrashSDC->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopTrashSDCButton->setCursor(Qt::OpenHandCursor);

    TopTriangleLocator::WorkMode wm=ui->RenderTopTriangleLocator->GetCurrentWorkMode();
    if(wm!=TopTriangleLocator::WorkMode::WM_SDC)
        return;

    ui->RenderTopTriangleLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTopTrashSDC->value()));
    ui->RenderRightTriangleLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTopTrashSDC->value()));
}

void RSPView::on_ChangeTopTrashSDC_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeTopTrashSDCButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeTopTrashSDC->maximum())));
}

void RSPView::on_ChangeTopTrashPASSButton_pressed()
{
    ui->ChangeTopTrashPASS->show();
    ui->ChangeTopTrashPASS->setEnabled(true);
    ui->ChangeTopTrashPASSButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopTrashPASS_sliderPressed()
{
    ui->ChangeTopTrashPASS->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopTrashPASS_sliderReleased()
{
    ui->ChangeTopTrashPASS->hide();
    ui->ChangeTopTrashPASS->setDisabled(true);
    ui->ChangeTopTrashPASS->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopTrashPASSButton->setCursor(Qt::OpenHandCursor);
    TopTriangleLocator::WorkMode wm=ui->RenderTopTriangleLocator->GetCurrentWorkMode();
    if(wm!=TopTriangleLocator::WorkMode::WM_PASS)
        return;
    ui->RenderTopTriangleLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTopTrashPASS->value()));
    ui->RenderRightTriangleLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTopTrashPASS->value()));
}

void RSPView::on_ChangeTopTrashPASS_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeTopTrashPASSButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeTopTrashPASS->maximum())));
}

void RSPView::on_ChangeTopTrashAKTButton_pressed()
{
    ui->ChangeTopTrashAKT->show();
    ui->ChangeTopTrashAKT->setEnabled(true);
    ui->ChangeTopTrashAKTButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopTrashAKT_sliderPressed()
{
    ui->ChangeTopTrashAKT->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeTopTrashAKT_sliderReleased()
{
    ui->ChangeTopTrashAKT->hide();
    ui->ChangeTopTrashAKT->setDisabled(true);
    ui->ChangeTopTrashAKT->setCursor(Qt::OpenHandCursor);
    ui->ChangeTopTrashAKTButton->setCursor(Qt::OpenHandCursor);
    TopTriangleLocator::WorkMode wm=ui->RenderTopTriangleLocator->GetCurrentWorkMode();
    if(wm!=TopTriangleLocator::WorkMode::WM_AKT)
        return;
    ui->RenderTopTriangleLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTopTrashAKT->value()));
    ui->RenderRightTriangleLocator->SetSettings("trash","intensity",static_cast<quint8>(ui->ChangeTopTrashAKT->value()));
}

void RSPView::on_ChangeTopTrashAKT_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeTopTrashAKTButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeTopTrashAKT->maximum())));
}

void RSPView::on_SelectTopScale_pressed()
{
    ui->SelectTopScale->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_SelectTopScale_released()
{
    static bool way=false;
    qint16 degree=0u;
    TopTriangleLocator::Scale s=ui->RenderTopTriangleLocator->GetCurrentScaleMode();
    RightTriangleLocator::Scale sr=ui->RenderRightTriangleLocator->GetCurrentScaleMode();
    if(s==TopTriangleLocator::Scale::S_LARGE && sr==RightTriangleLocator::Scale::S_LARGE)
    {
        degree=90u;
        ui->RenderTopTriangleLocator->SetCurrentScaleMode(TopTriangleLocator::Scale::S_SMALL);
        ui->RenderRightTriangleLocator->SetCurrentScaleMode(RightTriangleLocator::Scale::S_SMALL);
    }
    else if(s==TopTriangleLocator::Scale::S_SMALL && sr==RightTriangleLocator::Scale::S_SMALL)
    {
        if(way)
        {
            degree=0u;
            ui->RenderTopTriangleLocator->SetCurrentScaleMode(TopTriangleLocator::Scale::S_LARGE);
            ui->RenderRightTriangleLocator->SetCurrentScaleMode(RightTriangleLocator::Scale::S_LARGE);
        }
        else
        {
            degree=180u;
            ui->RenderTopTriangleLocator->SetCurrentScaleMode(TopTriangleLocator::Scale::S_MIDDLE);
            ui->RenderRightTriangleLocator->SetCurrentScaleMode(RightTriangleLocator::Scale::S_MIDDLE);
        }
        way=!way;
    }
    else if(s==TopTriangleLocator::Scale::S_MIDDLE && sr==RightTriangleLocator::Scale::S_MIDDLE)
    {
        degree=90u;
        ui->RenderTopTriangleLocator->SetCurrentScaleMode(TopTriangleLocator::Scale::S_SMALL);
        ui->RenderRightTriangleLocator->SetCurrentScaleMode(RightTriangleLocator::Scale::S_SMALL);
    }

    ui->RenderTopTriangleLocator->SetSettings("trash","begin",.0f);
    ui->RenderTopTriangleLocator->SetSettings("trash","end",static_cast<qreal>(ui->RenderTopTriangleLocator->GetCurrentScaleMode()));

    ui->RenderRightTriangleLocator->SetSettings("trash","begin",.0f);
    ui->RenderRightTriangleLocator->SetSettings("trash","end",static_cast<qreal>(ui->RenderRightTriangleLocator->GetCurrentScaleMode()));

    ui->SelectTopScale->setIcon(QIcon(degree==90u ? QPixmap(":/buttons/switch_base") : Daddy::RotateResourceImage(":/buttons/switch_up",degree)));
    ui->SelectTopScale->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_SelectTopMode_pressed()
{
    ui->SelectTopMode->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_SelectTopMode_released()
{
    static bool way=false;
    qint8 degree=0u;
    TopTriangleLocator::WorkMode wm=ui->RenderTopTriangleLocator->GetCurrentWorkMode();
    RightTriangleLocator::WorkMode wmr=ui->RenderRightTriangleLocator->GetCurrentWorkMode();

    if(wm==TopTriangleLocator::WorkMode::WM_PASS && wmr==RightTriangleLocator::WorkMode::WM_PASS)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_SDC);
        ui->RenderTopTriangleLocator->SetCurrentWorkMode(TopTriangleLocator::WorkMode::WM_COMMON);
        ui->RenderRightTriangleLocator->SetCurrentWorkMode(RightTriangleLocator::WorkMode::WM_COMMON);
    }
    else if(wm==TopTriangleLocator::WorkMode::WM_COMMON && wmr==RightTriangleLocator::WorkMode::WM_COMMON)
    {
        if(way)
        {
            degree=-60;
            ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_PASS);
            ui->RenderTopTriangleLocator->SetCurrentWorkMode(TopTriangleLocator::WorkMode::WM_PASS);
            ui->RenderRightTriangleLocator->SetCurrentWorkMode(RightTriangleLocator::WorkMode::WM_PASS);
        }
        else
        {
            degree=60u;
            ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_AKT);
            ui->RenderTopTriangleLocator->SetCurrentWorkMode(TopTriangleLocator::WorkMode::WM_AKT);
            ui->RenderRightTriangleLocator->SetCurrentWorkMode(RightTriangleLocator::WorkMode::WM_AKT);
        }
        way=!way;
    }
    else if(wm==TopTriangleLocator::WorkMode::WM_AKT && wmr==RightTriangleLocator::WorkMode::WM_AKT)
    {
        degree=0u;
        ui->RenderMainLocator->SetCurrentWorkMode(MainLocator::WorkMode::WM_SDC);
        ui->RenderTopTriangleLocator->SetCurrentWorkMode(TopTriangleLocator::WorkMode::WM_COMMON);
        ui->RenderRightTriangleLocator->SetCurrentWorkMode(RightTriangleLocator::WorkMode::WM_COMMON);
    }

    ui->SelectTopMode->setIcon(QIcon(degree==0u ? QPixmap(":/buttons/knob") : Daddy::RotateResourceImage(":/buttons/knob",degree)));
    ui->SelectTopMode->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightScanAmpVerticalButton_pressed()
{
    ui->ChangeRightScanAmpVertical->show();
    ui->ChangeRightScanAmpVertical->setEnabled(true);
    ui->ChangeRightScanAmpVerticalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightScanAmpVertical_sliderPressed()
{
    ui->ChangeRightScanAmpVertical->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightScanAmpVertical_sliderReleased()
{
    ui->ChangeRightScanAmpVertical->hide();
    ui->ChangeRightScanAmpVertical->setDisabled(true);
    ui->ChangeRightScanAmpVertical->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightScanAmpVerticalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightScanAmpVertical_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderRightTriangleLocator->SetSettings("amplitude","vertical",static_cast<qreal>(value)/100);
    ui->ChangeRightScanAmpVerticalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeRightScanAmpVertical->maximum())));
}

void RSPView::on_ChangeRightScanAmpHorizontalButton_pressed()
{
    ui->ChangeRightScanAmpHorizontal->show();
    ui->ChangeRightScanAmpHorizontal->setEnabled(true);
    ui->ChangeRightScanAmpHorizontalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightScanAmpHorizontal_sliderPressed()
{
    ui->ChangeRightScanAmpHorizontal->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightScanAmpHorizontal_sliderReleased()
{
    ui->ChangeRightScanAmpHorizontal->hide();
    ui->ChangeRightScanAmpHorizontal->setDisabled(true);
    ui->ChangeRightScanAmpHorizontal->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightScanAmpHorizontalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightScanAmpHorizontal_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderRightTriangleLocator->SetSettings("amplitude","horizontal",static_cast<qreal>(value)/100);
    ui->ChangeRightScanAmpHorizontalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeRightScanAmpHorizontal->maximum())));
}

void RSPView::on_ChangeRightOffsetVerticalButton_pressed()
{
    ui->ChangeRightOffsetVertical->show();
    ui->ChangeRightOffsetVertical->setEnabled(true);
    ui->ChangeRightOffsetVerticalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightOffsetVertical_sliderPressed()
{
    ui->ChangeRightOffsetVertical->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightOffsetVertical_sliderReleased()
{
    ui->ChangeRightOffsetVertical->hide();
    ui->ChangeRightOffsetVertical->setDisabled(true);
    ui->ChangeRightOffsetVertical->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightOffsetVerticalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightOffsetVertical_valueChanged(int value)
{
    ui->RenderRightTriangleLocator->SetSettings("offset","vertical",static_cast<qreal>(value)/100);
    ui->ChangeRightOffsetVerticalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeRightOffsetVertical->maximum())));
}

void RSPView::on_ChangeRightOffsetHorizontalButton_pressed()
{
    ui->ChangeRightOffsetHorizontal->show();
    ui->ChangeRightOffsetHorizontal->setEnabled(true);
    ui->ChangeRightOffsetHorizontalButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightOffsetHorizontal_sliderPressed()
{
    ui->ChangeRightOffsetHorizontal->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightOffsetHorizontal_sliderReleased()
{
    ui->ChangeRightOffsetHorizontal->hide();
    ui->ChangeRightOffsetHorizontal->setDisabled(true);
    ui->ChangeRightOffsetHorizontal->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightOffsetHorizontalButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightOffsetHorizontal_valueChanged(int value)
{
    ui->RenderRightTriangleLocator->SetSettings("offset","horizontal",static_cast<qreal>(value)/100);
    ui->ChangeRightOffsetHorizontalButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeRightOffsetHorizontal->maximum())));
}

void RSPView::on_ChangeRightDirectionTrackButton_pressed()
{
    ui->ChangeRightDirectionTrack->show();
    ui->ChangeRightDirectionTrack->setEnabled(true);
    ui->ChangeRightDirectionTrackButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightDirectionTrack_sliderPressed()
{
    ui->ChangeRightDirectionTrack->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightDirectionTrack_sliderReleased()
{
    ui->ChangeRightDirectionTrack->hide();
    ui->ChangeRightDirectionTrack->setDisabled(true);
    ui->ChangeRightDirectionTrack->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightDirectionTrackButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightDirectionTrack_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeRightDirectionTrackButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeRightDirectionTrack->maximum())));
}

void RSPView::on_ChangeRightDirectionGlideButton_pressed()
{
    ui->ChangeRightDirectionGlide->show();
    ui->ChangeRightDirectionGlide->setEnabled(true);
    ui->ChangeRightDirectionGlideButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightDirectionGlide_sliderPressed()
{
    ui->ChangeRightDirectionGlide->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightDirectionGlide_sliderReleased()
{
    ui->ChangeRightDirectionGlide->hide();
    ui->ChangeRightDirectionGlide->setDisabled(true);
    ui->ChangeRightDirectionGlide->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightDirectionGlideButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightDirectionGlide_valueChanged(int value)
{
    if(value<0)
        return;
    ui->ChangeRightDirectionGlideButton->setIcon(QIcon(value==100u || value==0u ? QPixmap(":/buttons/p_rotator.png") : MainLocator::RotateResourceImage(":/buttons/p_rotator.png",value*360/ui->ChangeRightDirectionGlide->maximum())));
}

void RSPView::on_ChangeRightBrightnessRangeButton_pressed()
{
    ui->ChangeRightBrightnessRange->show();
    ui->ChangeRightBrightnessRange->setEnabled(true);
    ui->ChangeRightBrightnessRangeButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightBrightnessRange_sliderPressed()
{
    ui->ChangeRightBrightnessRange->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightBrightnessRange_sliderReleased()
{
    ui->ChangeRightBrightnessRange->hide();
    ui->ChangeRightBrightnessRange->setDisabled(true);
    ui->ChangeRightBrightnessRange->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightBrightnessRangeButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightBrightnessRange_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderTopTriangleLocator->SetSettings("brightness","range",static_cast<qreal>(value)/100);
    ui->RenderRightTriangleLocator->SetSettings("brightness","range",static_cast<qreal>(value)/100);
    ui->ChangeRightBrightnessRangeButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeRightBrightnessRange->maximum())));
}

void RSPView::on_ChangeRightBrightnessAzimuthButton_pressed()
{
    ui->ChangeRightBrightnessAzimuth->show();
    ui->ChangeRightBrightnessAzimuth->setEnabled(true);
    ui->ChangeRightBrightnessAzimuthButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightBrightnessAzimuth_sliderPressed()
{
    ui->ChangeRightBrightnessAzimuth->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightBrightnessAzimuth_sliderReleased()
{
    ui->ChangeRightBrightnessAzimuth->hide();
    ui->ChangeRightBrightnessAzimuth->setDisabled(true);
    ui->ChangeRightBrightnessAzimuth->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightBrightnessAzimuthButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightBrightnessAzimuth_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderTopTriangleLocator->SetSettings("brightness","azimuth",static_cast<qreal>(value)/100);
    ui->RenderRightTriangleLocator->SetSettings("brightness","azimuth",static_cast<qreal>(value)/100);
    ui->ChangeRightBrightnessAzimuthButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeRightBrightnessAzimuth->maximum())));
}

void RSPView::on_ChangeRightFocusButton_pressed()
{
    ui->ChangeRightFocus->show();
    ui->ChangeRightFocus->setEnabled(true);
    ui->ChangeRightFocusButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightFocus_sliderPressed()
{
    ui->ChangeRightFocus->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightFocus_sliderReleased()
{
    ui->ChangeRightFocus->hide();
    ui->ChangeRightFocus->setDisabled(true);
    ui->ChangeRightFocus->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightFocusButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightFocus_valueChanged(int value)
{
    ui->ChangeRightFocusButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeRightFocus->maximum())));
    value=value>=0 ? value+100 : 100-value;
    ui->RenderRightTriangleLocator->SetSettings("system","focus",static_cast<qreal>(value)/100);
}

void RSPView::on_ChangeRightFocusBrightnessButton_pressed()
{
    ui->ChangeRightFocusBrightness->show();
    ui->ChangeRightFocusBrightness->setEnabled(true);
    ui->ChangeRightFocusBrightnessButton->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightFocusBrightness_sliderPressed()
{
    ui->ChangeRightFocusBrightness->setCursor(Qt::ClosedHandCursor);
}

void RSPView::on_ChangeRightFocusBrightness_sliderReleased()
{
    ui->ChangeRightFocusBrightness->hide();
    ui->ChangeRightFocusBrightness->setDisabled(true);
    ui->ChangeRightFocusBrightness->setCursor(Qt::OpenHandCursor);
    ui->ChangeRightFocusBrightnessButton->setCursor(Qt::OpenHandCursor);
}

void RSPView::on_ChangeRightFocusBrightness_valueChanged(int value)
{
    if(value<0)
        return;
    ui->RenderRightTriangleLocator->SetSettings("system","brightness",static_cast<qreal>(value)/100);
    ui->ChangeRightFocusBrightnessButton->setIcon(QIcon(value%100u==0 || value==0u ? QPixmap(":/buttons/reo_knob.png") : Daddy::RotateResourceImage(":/buttons/reo_knob.png",value*360/ui->ChangeRightFocusBrightness->maximum())));
}

void RSPView::on_ChangeMainLocatorState_clicked()
{
    if(ui->RenderMainLocator->IsActive())
    {
        ui->RenderMainLocator->ChangeFPS(0u);
        ui->ChangeMainLocatorState->setText("Возобновить ИКО");
    }
    else
    {
        ui->RenderMainLocator->ChangeFPS(static_cast<qreal>(1000)/24);
        ui->ChangeMainLocatorState->setText("Остановить ИКО");
    }
}

void RSPView::on_ChangeMainLightningButton_pressed()
{

}

void RSPView::on_ChangeMainLightning_sliderPressed()
{

}

void RSPView::on_ChangeMainLightning_sliderReleased()
{

}

void RSPView::on_ChangeMainLightning_valueChanged(int value)
{
    ui->RenderMainLocator->SetSettings("system","lightning",static_cast<qreal>(value)/100);
}

void RSPView::on_ChangeTopState_clicked()
{
    if(ui->RenderTopTriangleLocator->IsActive())
    {
        ui->RenderTopTriangleLocator->ChangeFPS(0u);
        ui->ChangeTopState->setText("Возобновить\nкурсовой индикатор");
    }
    else
    {
        ui->RenderTopTriangleLocator->ChangeFPS(static_cast<qreal>(1000)/24);
        ui->ChangeTopState->setText("Остановить\nкурсовой индикатор");
    }
}

void RSPView::on_ChangeTopLightningButton_pressed()
{

}

void RSPView::on_ChangeTopLightning_sliderPressed()
{

}

void RSPView::on_ChangeTopLightning_sliderReleased()
{

}

void RSPView::on_ChangeTopLightning_valueChanged(int value)
{
    ui->RenderTopTriangleLocator->SetSettings("system","lightning",static_cast<qreal>(value)/(100*8));
}

void RSPView::on_ChangeRightState_clicked()
{
    if(ui->RenderRightTriangleLocator->IsActive())
    {
        ui->RenderRightTriangleLocator->ChangeFPS(0u);
        ui->ChangeRightState->setText("Возобновить\nглиссадный индикатор");
    }
    else
    {
        ui->RenderRightTriangleLocator->ChangeFPS(static_cast<qreal>(1000)/24);
        ui->ChangeRightState->setText("Остановить\nглиссадный индикатор");
    }
}

void RSPView::on_ChangeRightLightningButton_pressed()
{

}

void RSPView::on_ChangeRightLightning_sliderPressed()
{

}

void RSPView::on_ChangeRightLightning_sliderReleased()
{

}

void RSPView::on_ChangeRightLightning_valueChanged(int value)
{
    ui->RenderRightTriangleLocator->SetSettings("system","lightning",static_cast<qreal>(value)/(100*16));
}

void RSPView::on_InputActiveNoiseAzimuth_valueChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_noise_trash","azimuth",static_cast<quint16>(arg1));
}

void RSPView::on_SelectActiveNoiseIntensity_currentIndexChanged(int index)
{
    ui->RenderMainLocator->SetSettings("active_noise_trash","intensity",static_cast<quint16>(index));
}

void RSPView::on_CheckActiveNoiseShow_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_noise_trash","show",arg1==2);
}

void RSPView::on_InputActiveAnswerAzimuth_valueChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_answer_trash","azimuth",static_cast<quint16>(arg1));
}

void RSPView::on_InputActiveAnswerDistance_valueChanged(double arg1)
{
    ui->RenderMainLocator->SetSettings("active_answer_trash","distance",static_cast<qreal>(arg1));
}

void RSPView::on_CheckActiveAnswerShow_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_answer_trash","show",arg1==2);
}

void RSPView::on_CheckActiveInSyncShow_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("active_insync_trash","show",arg1==2);
}

void RSPView::on_ButtonResetLevers_clicked()
{
    ui->ChangeMainScanAmp->valueChanged(Settings.main_scan_amp);
    ui->ChangeMainScanEqua->valueChanged(Settings.main_scan_equa);
    ui->ChangeMainOffsetVertical->valueChanged(Settings.main_offset_vertical);
    ui->ChangeMainOffsetHorizontal->valueChanged(Settings.main_offset_horizontal);
    ui->ChangeMainBrightnessRange->valueChanged(Settings.main_brightness_range);
    ui->ChangeMainBrightnessAzimuth->valueChanged(Settings.main_brightness_azimuth);
    ui->ChangeMainFocus->valueChanged(Settings.main_focus);
    ui->ChangeMainFocusBrightness->valueChanged(Settings.main_focus_brightness);
    ui->ChangeMainLightning->valueChanged(Settings.main_lightning);
    ui->ChangeMainTrashAKT->valueChanged(Settings.main_trash_akt);
    ui->ChangeMainTrashPASS->valueChanged(Settings.main_trash_pass);

    ui->ChangeTopFocus->valueChanged(Settings.top_focus);
    ui->ChangeTopBrightness->valueChanged(Settings.top_brightness);
    ui->ChangeTopLightning->valueChanged(Settings.top_lightning);
    ui->ChangeTopTrashSDC->valueChanged(Settings.top_trash_sdc);
    ui->ChangeTopTrashPASS->valueChanged(Settings.top_trash_pass);
    ui->ChangeTopTrashAKT->valueChanged(Settings.top_trash_akt);
    ui->ChangeTopScanAmpVertical->valueChanged(Settings.top_scan_amp_vertical);
    ui->ChangeTopScanAmpHorizontal->valueChanged(Settings.top_scan_amp_horizontal);
    ui->ChangeTopOffsetVertical->valueChanged(Settings.top_offset_vertical);
    ui->ChangeTopOffsetHorizontal->valueChanged(Settings.top_offset_horizontal);

    ui->ChangeRightFocus->valueChanged(Settings.right_focus);
    ui->ChangeRightFocusBrightness->valueChanged(Settings.right_focus_brightness);
    ui->ChangeRightLightning->valueChanged(Settings.right_lightning);
    ui->ChangeRightScanAmpVertical->valueChanged(Settings.right_scan_amp_vertical);
    ui->ChangeRightScanAmpHorizontal->valueChanged(Settings.right_scan_amp_horizontal);
    ui->ChangeRightOffsetVertical->valueChanged(Settings.right_offset_vertical);
    ui->ChangeRightOffsetHorizontal->valueChanged(Settings.right_offset_horizontal);
    ui->ChangeRightBrightnessRange->valueChanged(Settings.right_brightness_range);
    ui->ChangeRightBrightnessAzimuth->valueChanged(Settings.right_brightness_azimuth);
}

void RSPView::on_SetTargetsSettings_clicked()
{
    TS=new TargetsSettings;
    TS->show();
}

void RSPView::on_CheckShowLocalItems_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("local_items","show",arg1==2);
}

void RSPView::on_CheckShowMeteo_stateChanged(int arg1)
{
    ui->RenderMainLocator->SetSettings("meteo","show",arg1==2);
}
