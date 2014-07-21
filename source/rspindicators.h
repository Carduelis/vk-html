#ifndef RSPINDICATORS_H
#define RSPINDICATORS_H

#include <QMainWindow>

namespace Ui {
class RSPIndicators;
}

class RSPIndicators : public QMainWindow
{
    Q_OBJECT

public:
    explicit RSPIndicators(QWidget *parent = 0);
    ~RSPIndicators();

    private slots:
        void on_ChangeMainTrashIntensityButton_pressed();
        void on_ChangeMainTrashIntensity_sliderPressed();
        void on_ChangeMainTrashIntensity_sliderReleased();
        void on_ChangeMainTrashIntensity_valueChanged(int value);
        void on_SelectMainAzimuthMarks_pressed();
        void on_SelectMainAzimuthMarks_released();
        void on_SelectMainRangeMarks_pressed();
        void on_SelectMainRangeMarks_released();
        void on_SelectMainScale_pressed();
        void on_SelectMainScale_released();
        void on_ChangeMainBrightnessButton_pressed();
        void on_ChangeMainBrightness_sliderPressed();
        void on_ChangeMainBrightness_sliderReleased();
        void on_ChangeMainBrightness_valueChanged(int value);
        void on_ChangeMainLightningButton_pressed();
        void on_ChangeMainLightning_sliderPressed();
        void on_ChangeMainLightning_sliderReleased();
        void on_ChangeMainLightning_valueChanged(int value);
        void on_ChangeMainFocusButton_pressed();
        void on_ChangeMainFocus_sliderPressed();
        void on_ChangeMainFocus_sliderReleased();
        void on_ChangeMainFocus_valueChanged(int value);
        void on_ChangeMainVARUButton_pressed();
        void on_ChangeMainVARU_sliderPressed();
        void on_ChangeMainVARU_sliderReleased();
        void on_ChangeMainVARU_valueChanged(int value);
        void on_ChangeMainViewStateAll_clicked();
        void on_ChangeMainLocatorState_clicked();
        void on_ChangeTopTrashIntensityButton_pressed();
        void on_ChangeTopTrashIntensity_sliderPressed();
        void on_ChangeTopTrashIntensity_sliderReleased();
        void on_ChangeTopTrashIntensity_valueChanged(int value);
        void on_SelectTopRangeMarks_pressed();
        void on_SelectTopRangeMarks_released();
        void on_SelectTopScale_pressed();
        void on_SelectTopScale_released();
        void on_ChangeTopBrightnessButton_pressed();
        void on_ChangeTopBrightness_sliderPressed();
        void on_ChangeTopBrightness_sliderReleased();
        void on_ChangeTopBrightness_valueChanged(int value);
        void on_ChangeTopLightningButton_pressed();
        void on_ChangeTopLightning_sliderPressed();
        void on_ChangeTopLightning_sliderReleased();
        void on_ChangeTopLightning_valueChanged(int value);
        void on_ChangeTopFocusButton_pressed();
        void on_ChangeTopFocus_sliderPressed();
        void on_ChangeTopFocus_sliderReleased();
        void on_ChangeTopFocus_valueChanged(int value);
        void on_ChangeTopVARUButton_pressed();
        void on_ChangeTopVARU_sliderPressed();
        void on_ChangeTopVARU_sliderReleased();
        void on_ChangeTopVARU_valueChanged(int value);
        void on_ChangeTopViewStateAll_clicked();
        void on_ChangeTopState_clicked();
        void on_ChangeRightTrashIntensityButton_pressed();
        void on_ChangeRightTrashIntensity_sliderPressed();
        void on_ChangeRightTrashIntensity_sliderReleased();
        void on_ChangeRightTrashIntensity_valueChanged(int value);
        void on_SelectRightRangeMarks_pressed();
        void on_SelectRightRangeMarks_released();
        void on_SelectRightScale_pressed();
        void on_SelectRightScale_released();
        void on_ChangeRightBrightnessButton_pressed();
        void on_ChangeRightBrightness_sliderPressed();
        void on_ChangeRightBrightness_sliderReleased();
        void on_ChangeRightBrightness_valueChanged(int value);
        void on_ChangeRightLightningButton_pressed();
        void on_ChangeRightLightning_sliderPressed();
        void on_ChangeRightLightning_sliderReleased();
        void on_ChangeRightLightning_valueChanged(int value);
        void on_ChangeRightFocusButton_pressed();
        void on_ChangeRightFocus_sliderPressed();
        void on_ChangeRightFocus_sliderReleased();
        void on_ChangeRightFocus_valueChanged(int value);
        void on_ChangeRightVARUButton_pressed();
        void on_ChangeRightVARU_sliderPressed();
        void on_ChangeRightVARU_sliderReleased();
        void on_ChangeRightVARU_valueChanged(int value);
        void on_ChangeRightViewStateAll_clicked();
        void on_ChangeRightState_clicked();
        void on_SelectTopAzimuthMarks_pressed();
        void on_SelectTopAzimuthMarks_released();
        void on_SelectRightAzimuthMarks_pressed();
        void on_SelectRightAzimuthMarks_released();

    protected:
        bool eventFilter(QObject *O,QEvent *E);
    private:
        Ui::RSPIndicators *ui;
};

#endif // RSPINDICATORS_H
