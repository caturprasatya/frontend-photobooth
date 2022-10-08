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
    },
    mixedFrame: {
        width : 4.2,
        height: 3.3
    },
    bareFrame: {
        width: 5,
        height: 5
    },
    fourFrameMixed: {
        width: 3.3,
        height: 5
    },
    fourFrame: {
        width: 4.2,
        height: 6
    }
};

export const ellipseFrameList = {
    frameID : ["8", "9", "10"]
};

export const mixedFrameList = {
    frameID: ["12"] //TODO: adjust the frame id accordingly
};

export const bareFrameList = {
  frameID: ["16", "17"] //TODO: adjust the frame id accordingly
};

export const fourFrameList = {
  frameID: ["15"] //TODO: adjust the frame id accordingly
};

export const fourFrameMixedList = {
  frameID: ["14"] //TODO: adjust the frame id accordingly
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