#include"menu.h"
#include"ui_menu.h"

Menu::Menu(QWidget *parent) : QMainWindow(parent),ui(new Ui::Menu)
{
    ui->setupUi(this);
}

Menu::~Menu()
{
    delete ui;
    delete DRL;
    delete PRL;
}

void Menu::ExternalLaunch(void)
{

}

void Menu::on_ButtonIndicatorDRL_clicked()
{
    DRL=new IndicatorDRL;
    DRL->show();
}

void Menu::on_ButtonIndicatorPRL_clicked()
{
    PRL=new IndicatorPRL;
    PRL->show();
}

void Menu::on_ButtonDRLPRL_clicked()
{
    RSPi=new RSPIndicators;
    RSPi->show();
}

void Menu::on_ButtonRSP_clicked()
{
    RSP=new RSPView;
    RSP->show();
}
