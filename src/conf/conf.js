export const frameRatio = {
    sixFrame: {
        width     : 4.4,
        height    : 4.1
    },
    eightFrame: {
        width     : 4.4,
        height    : 3.4
    },
    ellipseFrame: {
        width       : 4.5,
        height      : 3.2
    }
};

export const ellipseFrameList = {
    frameID : ["8", "9", "10"]
};

export const cameraScale = 1.5;

export const pricePoint = {
    intFormat : 1,
    stringFormat : "30.000"
};

export const paymentType_conf = 1      // 1 -> GoPay, 0 -> QRIS

export const getLocation = (locationIndex) => {
    switch (locationIndex) {
      case 1:
        return "Onni"
      case 2:
        return "Afterwork"
      case 3:
        return "Syrcle"
      default:
        return "Onni"
    }
  }

export const LOCATION_ID = 2;