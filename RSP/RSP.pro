#-------------------------------------------------
#
# Project created by QtCreator 2014-06-10T20:10:22
#
#-------------------------------------------------

QT       += core gui opengl designer widgets
CONFIG   += plugin

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets
QMAKE_CXXFLAGS += -std=c++0x
TARGET = RSP
TEMPLATE = app lib


SOURCES += main.cpp\
        menu.cpp \
    indicatordrl.cpp \
    mainlocator.cpp \
    indicatorprl.cpp \
    toptrianglelocator.cpp \
    righttrianglelocator.cpp \
    rspindicators.cpp \
    rspview.cpp \
    daddy.cpp \
    targetssettings.cpp

HEADERS  += menu.h \
    indicatordrl.h \
    mainlocator.h \
    indicatorprl.h \
    toptrianglelocator.h \
    righttrianglelocator.h \
    rspindicators.h \
    rspview.h \
    daddy.h \
    targetssettings.h

FORMS    += menu.ui \
    indicatordrl.ui \
    indicatorprl.ui \
    rspindicators.ui \
    rspview.ui \
    targetssettings.ui

target.path = $$[QT_INSTALL_PLUGINS]/designer
INSTALLS += target

RESOURCES += \
    Common.qrc

OTHER_FILES += \
    rsp.rc
RC_FILE = rsp.rc
