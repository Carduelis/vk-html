#ifndef INDICATORPRL_H
#define INDICATORPRL_H

#include<QMainWindow>

namespace Ui
{
    class IndicatorPRL;
}

class IndicatorPRL : public QMainWindow
{
    Q_OBJECT

    public:
        explicit IndicatorPRL(QWidget *parent=0);
        ~IndicatorPRL();

    private slots:
        void on_SelectTopRangeMarks_pressed();
        void on_SelectTopRangeMarks_released();
        void on_ChangeTopTrashIntensityButton_pressed();
        void on_ChangeTopTrashIntensity_sliderPressed();
        void on_ChangeTopTrashIntensity_sliderReleased();
        void on_ChangeTopTrashIntensity_valueChanged(int value);
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
        void on_SelectTopScale_pressed();
        void on_SelectTopScale_released();
        void on_ChangeTopViewStateAll_clicked();
        void on_ChangeTopState_clicked();
        void on_SelectRightRangeMarks_pressed();
        void on_SelectRightRangeMarks_released();
        void on_ChangeRightTrashIntensityButton_pressed();
        void on_ChangeRightTrashIntensity_sliderPressed();
        void on_ChangeRightTrashIntensity_sliderReleased();
        void on_ChangeRightTrashIntensity_valueChanged(int value);
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
        void on_SelectRightScale_pressed();
        void on_SelectRightScale_released();
        void on_ChangeRightViewStateAll_clicked();
        void on_ChangeRightState_clicked();
        void on_SelectTopAzimuthMarks_pressed();
        void on_SelectTopAzimuthMarks_released();
        void on_SelectRightAzimuthMarks_pressed();
        void on_SelectRightAzimuthMarks_released();

    protected:
        bool eventFilter(QObject *O,QEvent *E);
    private:
            Ui::IndicatorPRL *ui;
};

#endif // INDICATORPRL_H
