/* MMOQuest
 *
 * Данил Гужвин
 * Сергей Калашников
 * Николай Вепрев
 * Дмитрий Петров
 *
 * 04.11.2020 10:00 (GMT+3)
 */
MyLib.MMOQOB.bWidth = 480
MyLib.MMOQOB.bHeight = 730
MyLib.MMOQOB.bIntervar = {}
MyLib.MMOQOB.bRun = 0
MyLib.MMOQOB.bVar = 0
MyLib.MMOQOB.bLoaded = 0

$(document).ready(function () {
  try {
    //    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true
    MyLib.MMOQOB.app = new PIXI.Application({
      width: MyLib.MMOQOB.bWidth,
      height: MyLib.MMOQOB.bHeight,
      transparent: true,
    })
    MyLib.MMOQOB.app.loader
      .add([
        "../json/Mob/json_01.json",
        "../json/Player/json_01.json",
        "../json/weapon/weapon_new.json",
        "../json/icons/icons.json",
        "../json/dress/dress.json",
      ])
      .load(onAssetsLoaded)
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
})
onAssetsLoaded = function (loader) {
  try {
    MyLib.MMOQOB.jsonMob = loader.resources["../json/Mob/json_01.json"].data
    MyLib.MMOQOB.jsonPlayer =
      loader.resources["../json/Player/json_01.json"].data
    MyLib.MMOQOB.jsonWeapon =
      loader.resources["../json/weapon/weapon_new.json"].data
    MyLib.MMOQOB.jsonIcons = loader.resources["../json/icons/icons.json"].data
    MyLib.MMOQOB.jsonDress = loader.resources["../json/dress/dress.json"].data
    MyLib.MMOQOB.sprites = {}
    MyLib.MMOQOB.sprites.location = {}
    MyLib.MMOQOB.sprites.location_b = {}
    for (var i = 0; i < 200; i++) {
      MyLib.MMOQOB.sprites.location[i] = "../img/location/" + i + ".jpg"
      MyLib.MMOQOB.sprites.location_b[i] = "../img/battle_fon/" + i + ".jpg"
    }
    MyLib.MMOQOB.location = new PIXI.Sprite()
    MyLib.MMOQOB.location.texture = PIXI.Texture.from(
      MyLib.MMOQOB.sprites.location[1],
    )
    MyLib.MMOQOB.location.anchor.set(0)
    MyLib.MMOQOB.location.width = MyLib.MMOQOB.bWidth - 40
    MyLib.MMOQOB.location.height = MyLib.MMOQOB.bHeight / 2 - 40
    MyLib.MMOQOB.location.x = 20
    MyLib.MMOQOB.location.y = 20
    MyLib.MMOQOB.sprites.ramka = {}
    MyLib.MMOQOB.sprites.ramka[0] = "../images/ramka.png"
    MyLib.MMOQOB.sprites.ramka[1] = "../images/ramkab.png"
    MyLib.MMOQOB.ramka = new PIXI.Sprite()
    MyLib.MMOQOB.ramka.texture = PIXI.Texture.from(
      MyLib.MMOQOB.sprites.ramka[0],
    )
    MyLib.MMOQOB.ramka.anchor.set(0)
    MyLib.MMOQOB.ramka.width = MyLib.MMOQOB.bWidth
    MyLib.MMOQOB.ramka.height = MyLib.MMOQOB.bHeight / 2
    MyLib.MMOQOB.ramka.x = 0
    MyLib.MMOQOB.ramka.y = 0
    MyLib.MMOQOB.sprites.button = {}
    MyLib.MMOQOB.sprites.button[0] = {}
    MyLib.MMOQOB.sprites.button[0][0] = "../img/button/g3.png"
    MyLib.MMOQOB.sprites.button[0][1] = "../img/button/g1.png"
    MyLib.MMOQOB.sprites.button[0][2] = "../img/button/g2.png"
    MyLib.MMOQOB.sprites.button[1] = {}
    MyLib.MMOQOB.sprites.button[1][0] = "../img/button/y3.png"
    MyLib.MMOQOB.sprites.button[1][1] = "../img/button/y1.png"
    MyLib.MMOQOB.sprites.button[1][2] = "../img/button/y2.png"
    MyLib.MMOQOB.sprites.button[2] = {}
    MyLib.MMOQOB.sprites.button[2][0] = "../img/button/r3.png"
    MyLib.MMOQOB.sprites.button[2][1] = "../img/button/r1.png"
    MyLib.MMOQOB.sprites.button[2][2] = "../img/button/r2.png"
    MyLib.MMOQOB.sprites.button[3] = {}
    MyLib.MMOQOB.sprites.button[3][0] = "../img/button/btnyes.png"
    MyLib.MMOQOB.sprites.button[3][1] = "../img/button/btnno.png"
    MyLib.MMOQOB.button = {}
    MyLib.MMOQOB.button[0] = new PIXI.Sprite()
    MyLib.MMOQOB.button[0].texture = PIXI.Texture.from(
      MyLib.MMOQOB.sprites.button[0][0],
    )
    MyLib.MMOQOB.button[0].anchor.set(0.5, 0)
    MyLib.MMOQOB.button[0].width = 120
    MyLib.MMOQOB.button[0].height = 100
    MyLib.MMOQOB.button[0].x = MyLib.MMOQOB.bWidth * 0.2
    MyLib.MMOQOB.button[0].y = 0
    MyLib.MMOQOB.button[0].value = 0
    MyLib.MMOQOB.button[0].interactive = true
    MyLib.MMOQOB.button[0].on("pointerdown", buttonDownBattle)
    MyLib.MMOQOB.button[0].on("pointerup", buttonUpBattle)
    MyLib.MMOQOB.button[0].on("pointerout", buttonOutBattle)
    MyLib.MMOQOB.button[1] = new PIXI.Sprite()
    MyLib.MMOQOB.button[1].texture = PIXI.Texture.from(
      MyLib.MMOQOB.sprites.button[0][1],
    )
    MyLib.MMOQOB.button[1].anchor.set(0.5, 0)
    MyLib.MMOQOB.button[1].width = 120
    MyLib.MMOQOB.button[1].height = 100
    MyLib.MMOQOB.button[1].x = MyLib.MMOQOB.bWidth * 0.5
    MyLib.MMOQOB.button[1].y = 0
    MyLib.MMOQOB.button[1].value = 1
    MyLib.MMOQOB.button[1].interactive = true
    MyLib.MMOQOB.button[1].on("pointerdown", buttonDownBattle)
    MyLib.MMOQOB.button[1].on("pointerup", buttonUpBattle)
    MyLib.MMOQOB.button[1].on("pointerout", buttonOutBattle)
    MyLib.MMOQOB.button[2] = new PIXI.Sprite()
    MyLib.MMOQOB.button[2].texture = PIXI.Texture.from(
      MyLib.MMOQOB.sprites.button[0][2],
    )
    MyLib.MMOQOB.button[2].anchor.set(0.5, 0)
    MyLib.MMOQOB.button[2].width = 120
    MyLib.MMOQOB.button[2].height = 100
    MyLib.MMOQOB.button[2].x = MyLib.MMOQOB.bWidth * 0.8
    MyLib.MMOQOB.button[2].y = 0
    MyLib.MMOQOB.button[2].value = 2
    MyLib.MMOQOB.button[2].interactive = true
    MyLib.MMOQOB.button[2].on("pointerdown", buttonDownBattle)
    MyLib.MMOQOB.button[2].on("pointerup", buttonUpBattle)
    MyLib.MMOQOB.button[2].on("pointerout", buttonOutBattle)
    MyLib.MMOQOB.button[3] = new PIXI.Sprite()
    MyLib.MMOQOB.button[3].texture = PIXI.Texture.from(
      MyLib.MMOQOB.sprites.button[3][1],
    )
    MyLib.MMOQOB.button[3].anchor.set(0.5, 0)
    MyLib.MMOQOB.button[3].alpha = 1
    MyLib.MMOQOB.button[3].width = 50
    MyLib.MMOQOB.button[3].height = 51
    MyLib.MMOQOB.button[3].x = MyLib.MMOQOB.bWidth * 0.5
    MyLib.MMOQOB.button[3].y = 40
    MyLib.MMOQOB.button[3].interactive = true
    MyLib.MMOQOB.button[3].on("pointerdown", AutoBattle)
    MyLib.MMOQOB.sprites.bag = "../images/GOL_app_bag.png"
    MyLib.MMOQOB.bag = new PIXI.Sprite()
    MyLib.MMOQOB.bag.texture = PIXI.Texture.from(MyLib.MMOQOB.sprites.bag)
    MyLib.MMOQOB.bag.anchor.set(0)
    MyLib.MMOQOB.bag.width = MyLib.MMOQOB.bWidth - 4
    MyLib.MMOQOB.bag.height = MyLib.MMOQOB.bHeight / 2 - 100
    MyLib.MMOQOB.bag.x = 2
    MyLib.MMOQOB.bag.y = 100
    MyLib.MMOQOB.buttonContainer = new PIXI.Container()
    MyLib.MMOQOB.buttonContainer.width = MyLib.MMOQOB.bWidth
    MyLib.MMOQOB.buttonContainer.height = MyLib.MMOQOB.bHeight / 2
    MyLib.MMOQOB.buttonContainer.x = 0
    MyLib.MMOQOB.buttonContainer.y = MyLib.MMOQOB.bHeight / 2
    MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.button[0])
    MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.button[1])
    MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.button[2])
    MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.bag)
    MyLib.MMOQOB.buttonScale = 1.5
    MyLib.MMOQOB.shield = new PIXI.TilingSprite(
      PIXI.Texture.from("../images/GOL_app_shield.png"),
    )
    MyLib.MMOQOB.shield.anchor.set(1, 0)
    MyLib.MMOQOB.shield.width = 75 * MyLib.MMOQOB.buttonScale
    MyLib.MMOQOB.shield.height = 82 * MyLib.MMOQOB.buttonScale
    MyLib.MMOQOB.shield.tileScale.x = MyLib.MMOQOB.buttonScale
    MyLib.MMOQOB.shield.tileScale.y = MyLib.MMOQOB.buttonScale
    MyLib.MMOQOB.shield.tilePosition.x = 0
    MyLib.MMOQOB.shield.tilePosition.y = 0
    MyLib.MMOQOB.shield.x = (MyLib.MMOQOB.bWidth - 10) / 4 + 5
    MyLib.MMOQOB.shield.y = 105
    MyLib.MMOQOB.shield.interactive = true
    MyLib.MMOQOB.shield.value = 3
    MyLib.MMOQOB.shield.bol = true
    MyLib.MMOQOB.shield.on("pointerdown", buttonDownBattle)
    MyLib.MMOQOB.shield.on("pointerup", buttonUpBattle)
    MyLib.MMOQOB.shield.on("pointerout", buttonOutBattle)
    MyLib.MMOQOB.shield.label = new PIXI.Text(0)
    MyLib.MMOQOB.shield.label.anchor.set(0.5, 1)
    MyLib.MMOQOB.shield.label.x = -MyLib.MMOQOB.shield.width / 2
    MyLib.MMOQOB.shield.label.y = MyLib.MMOQOB.shield.height - 12
    MyLib.MMOQOB.shield.label.style.fontSize = 22
    MyLib.MMOQOB.shield.addChild(MyLib.MMOQOB.shield.label)
    MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.shield)
    MyLib.MMOQOB.texture = {}
    MyLib.MMOQOB.sprites.shopicons = []
    for (var i = 0; i < 420; i++) {
      MyLib.MMOQOB.sprites.shopicons[i] = "../images/shopicons/" + i + ".png"
    }

    MyLib.MMOQOB.shopicons = []
    for (var i = 0; i < 7; i++) {
      MyLib.MMOQOB.shopicons[i] = new PIXI.Sprite()
      MyLib.MMOQOB.shopicons[i].width = 80
      MyLib.MMOQOB.shopicons[i].height = 80
      MyLib.MMOQOB.shopicons[i].visible = false
    }

    MyLib.MMOQOB.sprites.pocket = "../images/GOL_app_pocket.png"
    MyLib.MMOQOB.pocket = []
    for (var i = 0; i < 7; i++) {
      MyLib.MMOQOB.pocket[i] = new PIXI.Sprite()
      MyLib.MMOQOB.pocket[i].texture = PIXI.Texture.from(
        MyLib.MMOQOB.sprites.pocket,
      )
      MyLib.MMOQOB.pocket[i].anchor.set(0, 0)
      MyLib.MMOQOB.pocket[i].width = 75 * MyLib.MMOQOB.buttonScale
      MyLib.MMOQOB.pocket[i].height = 82 * MyLib.MMOQOB.buttonScale
      if (i < 3) {
        MyLib.MMOQOB.pocket[i].x =
          ((MyLib.MMOQOB.bWidth - 10) / 4) * (i + 1) + 5
        MyLib.MMOQOB.pocket[i].y = 105
        MyLib.MMOQOB.shopicons[i].x =
          ((MyLib.MMOQOB.bWidth - 10) / 4) * (i + 1) + 22
        MyLib.MMOQOB.shopicons[i].y = 108
      } else {
        MyLib.MMOQOB.pocket[i].x =
          ((MyLib.MMOQOB.bWidth - 10) / 4) * (i - 3) + 5
        MyLib.MMOQOB.pocket[i].y = 225
        MyLib.MMOQOB.shopicons[i].x =
          ((MyLib.MMOQOB.bWidth - 10) / 4) * (i - 3) + 22
        MyLib.MMOQOB.shopicons[i].y = 228
      }
      MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.pocket[i])
      MyLib.MMOQOB.shopicons[i].interactive = true
      MyLib.MMOQOB.shopicons[i].value = 4 + i
      MyLib.MMOQOB.shopicons[i].on("pointerdown", buttonDownBattle)
      MyLib.MMOQOB.shopicons[i].on("pointerup", buttonUpBattle)
      MyLib.MMOQOB.shopicons[i].on("pointerout", buttonOutBattle)
      MyLib.MMOQOB.shopicons[i].label = new PIXI.Text(0)
      MyLib.MMOQOB.shopicons[i].label.anchor.set(0.5, 1)
      MyLib.MMOQOB.shopicons[i].label.x = MyLib.MMOQOB.shopicons[i].width / 2
      MyLib.MMOQOB.shopicons[i].label.y = MyLib.MMOQOB.shopicons[i].height + 28
      MyLib.MMOQOB.shopicons[i].label.style.fontSize = 22
      MyLib.MMOQOB.shopicons[i].addChild(MyLib.MMOQOB.shopicons[i].label)
      MyLib.MMOQOB.buttonContainer.addChild(MyLib.MMOQOB.shopicons[i])
    }

    MyLib.MMOQOB.svitokNameL = new PIXI.NineSlicePlane(
      PIXI.Texture.from("../img/logo_svg/logo.png"),
      22,
      16,
      22,
      16,
    )
    MyLib.MMOQOB.svitokNameL.height = 44
    MyLib.MMOQOB.svitokNameL.pivot.x = 0
    MyLib.MMOQOB.svitokNameL.pivot.y = 0
    MyLib.MMOQOB.svitokNameL.x = 0
    MyLib.MMOQOB.svitokNameL.y = 0
    MyLib.MMOQOB.svitokNameL.label = new PIXI.Text("")
    MyLib.MMOQOB.svitokNameL.label.anchor.set(0, 0.5)
    MyLib.MMOQOB.svitokNameL.label.x = 22
    MyLib.MMOQOB.svitokNameL.label.y = 22
    MyLib.MMOQOB.svitokNameL.label.style.fontSize = 18
    MyLib.MMOQOB.svitokNameL.addChild(MyLib.MMOQOB.svitokNameL.label)
    MyLib.MMOQOB.svitokNameR = new PIXI.NineSlicePlane(
      PIXI.Texture.from("../img/logo_svg/logo.png"),
      22,
      16,
      22,
      16,
    )
    MyLib.MMOQOB.svitokNameR.height = 44
    MyLib.MMOQOB.svitokNameR.pivot.x = MyLib.MMOQOB.svitokNameR.width
    MyLib.MMOQOB.svitokNameR.pivot.y = 0
    MyLib.MMOQOB.svitokNameR.x = MyLib.MMOQOB.ramka.width
    MyLib.MMOQOB.svitokNameR.y = 0
    MyLib.MMOQOB.svitokNameR.label = new PIXI.Text("")
    MyLib.MMOQOB.svitokNameR.label.anchor.set(0, 0.5)
    MyLib.MMOQOB.svitokNameR.label.x = 22
    MyLib.MMOQOB.svitokNameR.label.y = 22
    MyLib.MMOQOB.svitokNameR.label.style.fontSize = 18
    MyLib.MMOQOB.svitokNameR.addChild(MyLib.MMOQOB.svitokNameR.label)
    MyLib.MMOQOB.baseIconsTexture = new PIXI.BaseTexture(
      "../" + MyLib.MMOQOB.jsonIcons.img[0],
    )
    MyLib.MMOQOB.effectTextures = {}
    for (var i = 0; i < 12; i++) {
      MyLib.MMOQOB.effectTextures[i] = new PIXI.Texture(
        MyLib.MMOQOB.baseIconsTexture,
        new PIXI.Rectangle(i * 28, 28, 28, 28),
      )
    }

    MyLib.MMOQOB.numberTextures = {}
    for (var i = 0; i < 12; i++) {
      if (i === 10) {
        MyLib.MMOQOB.numberTextures["+"] = new PIXI.Texture(
          MyLib.MMOQOB.baseIconsTexture,
          new PIXI.Rectangle(i * 28, 112, 28, 28),
        )
      } else if (i === 11) {
        MyLib.MMOQOB.numberTextures["-"] = new PIXI.Texture(
          MyLib.MMOQOB.baseIconsTexture,
          new PIXI.Rectangle(i * 28, 112, 28, 28),
        )
      } else {
        MyLib.MMOQOB.numberTextures[i] = new PIXI.Texture(
          MyLib.MMOQOB.baseIconsTexture,
          new PIXI.Rectangle(i * 28, 112, 28, 28),
        )
      }
    }

    MyLib.MMOQOB.leftHpContainer = new PIXI.Container()
    MyLib.MMOQOB.leftHpContainer.x = 28
    MyLib.MMOQOB.leftHpContainer.y = 42
    MyLib.MMOQOB.leftHpIcon = new PIXI.Sprite()
    MyLib.MMOQOB.leftHpIcon.texture = MyLib.MMOQOB.effectTextures[10]
    MyLib.MMOQOB.leftHpContainer.addChild(MyLib.MMOQOB.leftHpIcon)
    MyLib.MMOQOB.numberLeftHp = []
    for (var i = 0; i < 6; i++) {
      MyLib.MMOQOB.numberLeftHp[i] = new PIXI.Sprite()
      //            MyLib.MMOQOB.numberLeftHp[i].texture = MyLib.MMOQOB.numberTextures[i];
      MyLib.MMOQOB.numberLeftHp[i].x = 28 + 22 * i
      MyLib.MMOQOB.leftHpContainer.addChild(MyLib.MMOQOB.numberLeftHp[i])
    }

    MyLib.MMOQOB.rightHpContainer = new PIXI.Container()
    MyLib.MMOQOB.rightHpContainer.x = MyLib.MMOQOB.ramka.width - 56
    MyLib.MMOQOB.rightHpContainer.y = 42
    MyLib.MMOQOB.rightHpIcon = new PIXI.Sprite()
    MyLib.MMOQOB.rightHpIcon.texture = MyLib.MMOQOB.effectTextures[10]
    MyLib.MMOQOB.rightHpContainer.addChild(MyLib.MMOQOB.rightHpIcon)
    MyLib.MMOQOB.numberRightHp = []
    for (var i = 0; i < 6; i++) {
      MyLib.MMOQOB.numberRightHp[i] = new PIXI.Sprite()
      //            MyLib.MMOQOB.numberRightHp[i].texture = MyLib.MMOQOB.numberTextures[i];
      MyLib.MMOQOB.numberRightHp[i].x = -28 - 22 * i
      MyLib.MMOQOB.rightHpContainer.addChild(MyLib.MMOQOB.numberRightHp[i])
    }

    MyLib.MMOQOB.app.stage = new PIXI.display.Stage()
    MyLib.MMOQOB.layerGroups = []
    MyLib.MMOQOB.layers = []
    MyLib.MMOQOB.layerGroups[0] = new PIXI.display.Group(0, true)
    MyLib.MMOQOB.layers[0] = new PIXI.display.Layer(MyLib.MMOQOB.layerGroups[0])
    MyLib.MMOQOB.layers[0].zIndex = -100
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.layers[0])
    MyLib.MMOQOB.layerGroups[1] = new PIXI.display.Group(0, true)
    MyLib.MMOQOB.layers[1] = new PIXI.display.Layer(MyLib.MMOQOB.layerGroups[1])
    MyLib.MMOQOB.layers[1].zIndex = 6
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.layers[1])
    MyLib.MMOQOB.layerGroups[2] = new PIXI.display.Group(0, true)
    MyLib.MMOQOB.layers[2] = new PIXI.display.Layer(MyLib.MMOQOB.layerGroups[2])
    MyLib.MMOQOB.layers[2].zIndex = 2
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.layers[2])
    MyLib.MMOQOB.layerGroups[3] = new PIXI.display.Group(0, true)
    MyLib.MMOQOB.layers[3] = new PIXI.display.Layer(MyLib.MMOQOB.layerGroups[3])
    MyLib.MMOQOB.layers[3].zIndex = 2
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.layers[3])
    MyLib.MMOQOB.layerGroups[4] = new PIXI.display.Group(0, true)
    MyLib.MMOQOB.layers[4] = new PIXI.display.Layer(MyLib.MMOQOB.layerGroups[4])
    MyLib.MMOQOB.layers[4].zIndex = 100
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.layers[4])
    MyLib.MMOQOB.app.stage.sortableChildren = true
    MyLib.MMOQOB.playerContainers = []
    MyLib.MMOQOB.playerContainers[0] = new PIXI.Container()
    MyLib.MMOQOB.playerContainers[0].width = MyLib.MMOQOB.bWidth
    MyLib.MMOQOB.playerContainers[0].height = MyLib.MMOQOB.bHeight / 2
    MyLib.MMOQOB.playerContainers[0].zIndex = 20
    MyLib.MMOQOB.playerContainers[1] = new PIXI.Container()
    MyLib.MMOQOB.playerContainers[1].width = MyLib.MMOQOB.bWidth
    MyLib.MMOQOB.playerContainers[1].height = MyLib.MMOQOB.bHeight / 2
    MyLib.MMOQOB.playerContainers[1].pivot.x = MyLib.MMOQOB.bWidth
    MyLib.MMOQOB.playerContainers[1].scale.x = -1
    MyLib.MMOQOB.playerContainers[1].zIndex = 20
    MyLib.MMOQOB.playerContainers[2] = new PIXI.Container()
    MyLib.MMOQOB.playerContainers[2].width = MyLib.MMOQOB.bWidth
    MyLib.MMOQOB.playerContainers[2].height = MyLib.MMOQOB.bHeight / 2
    MyLib.MMOQOB.playerContainers[2].zIndex = 20
    MyLib.MMOQOB.location.parentGroup = MyLib.MMOQOB.layerGroups[0]
    MyLib.MMOQOB.playerContainers[0].parentGroup = MyLib.MMOQOB.layerGroups[1]
    MyLib.MMOQOB.playerContainers[1].parentGroup = MyLib.MMOQOB.layerGroups[2]
    MyLib.MMOQOB.playerContainers[2].parentGroup = MyLib.MMOQOB.layerGroups[3]
    MyLib.MMOQOB.ramka.parentGroup = MyLib.MMOQOB.layerGroups[4]
    MyLib.MMOQOB.leftHpContainer.parentGroup = MyLib.MMOQOB.layerGroups[4]
    MyLib.MMOQOB.rightHpContainer.parentGroup = MyLib.MMOQOB.layerGroups[4]
    MyLib.MMOQOB.svitokNameL.parentGroup = MyLib.MMOQOB.layerGroups[4]
    MyLib.MMOQOB.svitokNameR.parentGroup = MyLib.MMOQOB.layerGroups[4]
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.location)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.playerContainers[0])
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.playerContainers[1])
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.playerContainers[2])
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.ramka)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.leftHpContainer)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.rightHpContainer)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.svitokNameL)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.svitokNameR)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.buttonContainer)
    MyLib.MMOQOB.app.stage.addChild(MyLib.MMOQOB.button[3])
    MyLib.MMOQOB.button[3].y = 300
    MyLib.MMOQOB.button[3].parentGroup = MyLib.MMOQOB.layerGroups[4]
    MyLib.MMOQOB.app.ticker.add(function (delta) {
      if (MyLib.MMOQOB.bRun) {
        updateAnimations(delta)
      }
    })
    MyLib.MMOQOB.weaponTexture = new PIXI.BaseTexture(
      MyLib.MMOQOB.jsonWeapon.img[0],
    )
    MyLib.MMOQOB.weaponTextures = []
    for (var key in MyLib.MMOQOB.jsonWeapon.imgC) {
      MyLib.MMOQOB.weaponTextures[key] = new PIXI.Texture(
        MyLib.MMOQOB.weaponTexture,
        new PIXI.Rectangle(
          MyLib.MMOQOB.jsonWeapon.imgC[key][0],
          MyLib.MMOQOB.jsonWeapon.imgC[key][1],
          MyLib.MMOQOB.jsonWeapon.imgC[key][2],
          MyLib.MMOQOB.jsonWeapon.imgC[key][3],
        ),
      )
      MyLib.MMOQOB.weaponTextures[key].left =
        51 -
        MyLib.MMOQOB.jsonWeapon.imgC[key][2] / 2 +
        MyLib.MMOQOB.jsonWeapon.imgC[key][4] / 2
      MyLib.MMOQOB.weaponTextures[key].top =
        MyLib.MMOQOB.jsonWeapon.imgC[key][5] -
        MyLib.MMOQOB.jsonWeapon.imgC[key][3] / 2
    }
    MyLib.MMOQOB.p_1 = {
      x: 140,
      y: 270,
      arr: {},
      move: -1,
      moveEnd: -1,
      id: -1,
    }
    MyLib.MMOQOB.p_2 = {
      x: -200,
      y: 270,
      arr: {},
      move: -1,
      moveEnd: -1,
      id: -1,
    }
    cAPlayer_1(0, 0, 0)
    cAPlayer_2(0, 0, 0)
    window.addEventListener("resize", resizeBattle)
    MyLib.MMOQOB.bLoaded = 1
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
storeProp = function () {
  try {
    MyLib.MMOQOB.Shield_p_1 = 0
    MyLib.MMOQOB.Butil_p_1 = []
    MyLib.MMOQOB.Weapon_p_1 = 0
    MyLib.MMOQOB.Name_p_1 = ""
    MyLib.MMOQOB.Hp_p_1 = 0
    MyLib.MMOQOB.Weapon_p_2 = 0
    MyLib.MMOQOB.Name_p_2 = ""
    MyLib.MMOQOB.Hp_p_2 = 0
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
MyLib.MMOQOB.Effect_p_1_x = 30
MyLib.MMOQOB.Effect_p_1_y = 300
MyLib.MMOQOB.Effect_p_2_x = -55
MyLib.MMOQOB.Effect_p_2_y = 300
MyLib.MMOQOB.effects_1 = []
MyLib.MMOQOB.last_e_y_1 = 550
MyLib.MMOQOB.Speed_e_1 = 1
MyLib.MMOQOB.effects_2 = []
MyLib.MMOQOB.last_e_y_2 = 550
MyLib.MMOQOB.Speed_e_2 = 1
drawEffects = function (delta) {
  try {
    if (
      MyLib.MMOQOB.effects_1.length &&
      MyLib.MMOQOB.effects_1[MyLib.MMOQOB.effects_1.length - 1].y > 280
    ) {
      MyLib.MMOQOB.Speed_e_1 = 4
    } else if (MyLib.MMOQOB.Speed_e_1 > 1) {
      MyLib.MMOQOB.Speed_e_1 = 1
    }
    MyLib.MMOQOB.effects_1.forEach(function (item, index, obj) {
      if (index === 0 || MyLib.MMOQOB.last_e_y_1 < item.y) {
        item.tmp = MyLib.MMOQOB.Speed_e_1 * delta
        if (index === 0 || item.y - item.tmp > MyLib.MMOQOB.last_e_y_1) {
          item.y -= item.tmp
        }
        item.visible = true
      }
      MyLib.MMOQOB.last_e_y_1 = item.y + 20
      if (item.y < 65) {
        MyLib.MMOQOB.app.stage.removeChild(item)
        obj.splice(index, 1)
      }
    })
    if (
      MyLib.MMOQOB.effects_2.length &&
      MyLib.MMOQOB.effects_2[MyLib.MMOQOB.effects_2.length - 1].y > 280
    ) {
      MyLib.MMOQOB.Speed_e_2 = 4
    } else if (MyLib.MMOQOB.Speed_e_2 > 1) {
      MyLib.MMOQOB.Speed_e_2 = 1
    }
    MyLib.MMOQOB.effects_2.forEach(function (item, index, obj) {
      if (index === 0 || MyLib.MMOQOB.last_e_y_2 < item.y) {
        item.tmp = MyLib.MMOQOB.Speed_e_2 * delta
        if (index === 0 || item.y - item.tmp > MyLib.MMOQOB.last_e_y_2) {
          item.y -= item.tmp
        }
        item.visible = true
      }
      MyLib.MMOQOB.last_e_y_2 = item.y + 20
      if (item.y < 65) {
        MyLib.MMOQOB.app.stage.removeChild(item)
        obj.splice(index, 1)
      }
    })
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
MyLib.MMOQOB.la_n_1 = 0
MyLib.MMOQOB.la_n_2 = {}
updateAnimations = function (delta) {
  try {
    MyLib.MMOQOB.Counter_u_p_1 += delta
    if (MyLib.MMOQOB.Counter_u_p_1 > MyLib.MMOQOB.Sleep_p_1) {
      MyLib.MMOQOB.Counter_u_p_1 = 0
      if (
        MyLib.MMOQOB.Counter_p_1 >
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[MyLib.MMOQOB.Frame_p_1]
          .length -
          1
      ) {
        if (
          MyLib.MMOQOB.Shield_on_p_1 < 6 ||
          MyLib.MMOQOB.Anim_Tmp_1[1] === MyLib.MMOQOB.Shield_on_p_1
        ) {
          cAPlayer_1(
            MyLib.MMOQOB._Anim_p_1,
            MyLib.MMOQOB.Shield_on_p_1,
            MyLib.MMOQOB.Type_p_1,
          )
        }
        MyLib.MMOQOB.Counter_p_1 = 0
      }

      MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].x = MyLib.MMOQOB.p_1.x
      MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].y = MyLib.MMOQOB.p_1.y
      for (var key in MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes) {
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[key].visible = false
      }
      for (
        var i = 0;
        i <
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[
          MyLib.MMOQOB.Frame_p_1
        ][MyLib.MMOQOB.Counter_p_1][0].length;
        i++
      ) {
        MyLib.MMOQOB.la_n_1 =
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[
            MyLib.MMOQOB.Frame_p_1
          ][MyLib.MMOQOB.Counter_p_1][0][i][0]
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
          MyLib.MMOQOB.la_n_1
        ].x =
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[
            MyLib.MMOQOB.Frame_p_1
          ][MyLib.MMOQOB.Counter_p_1][0][i][1] +
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
            MyLib.MMOQOB.la_n_1
          ].padding.x
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
          MyLib.MMOQOB.la_n_1
        ].y =
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[
            MyLib.MMOQOB.Frame_p_1
          ][MyLib.MMOQOB.Counter_p_1][0][i][2] +
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
            MyLib.MMOQOB.la_n_1
          ].padding.y
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
          MyLib.MMOQOB.la_n_1
        ].rotation =
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[
            MyLib.MMOQOB.Frame_p_1
          ][MyLib.MMOQOB.Counter_p_1][0][i][3] * 0.0175
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
          MyLib.MMOQOB.la_n_1
        ].visible = true
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
          MyLib.MMOQOB.la_n_1
        ].zOrder = i
        //            if (typeof (ObjBattle.p_1.arr[ObjBattle.Anim_p_1].clothes[key]) != "undefined") {
        //            }
      }
      if (
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].json[
          MyLib.MMOQOB.Frame_p_1
        ][MyLib.MMOQOB.Counter_p_1][1]
      ) {
        if (MyLib.MMOQOB.Anim_Tmp_2[1] === 8) {
          cAPlayer_2(MyLib.MMOQOB.Anim_Tmp_2[0], 9, MyLib.MMOQOB.Anim_Tmp_2[2])
        } else {
          cAPlayer_2(
            MyLib.MMOQOB.Anim_Tmp_2[0],
            MyLib.MMOQOB.Anim_Tmp_2[1],
            MyLib.MMOQOB.Anim_Tmp_2[2],
          )
        }
        MyLib.MMOQOB.Counter_u_p_2 = 999
        MyLib.MMOQOB.Anim_Tmp_2[1] = MyLib.MMOQOB.Shield_on_p_2
        if (MyLib.MMOQOB.bTmp.length !== 0) {
          MyLib.MMOQOB.Hp_p_1 = MyLib.MMOQOB.bTmp[0]
          MyLib.MMOQOB.Hp_p_2 = MyLib.MMOQOB.bTmp[1]
          MyLib.MMOQOB.Effect_p_1 = MyLib.MMOQOB.bTmp[2]
          MyLib.MMOQOB.Effect_p_2 = MyLib.MMOQOB.bTmp[3]
          MyLib.MMOQOB.bTmp = []
        }
      }
      MyLib.MMOQOB.Counter_p_1++
    }
    MyLib.MMOQOB.a_n_1 = 0
    MyLib.MMOQOB.Counter_u_p_2 += delta
    if (MyLib.MMOQOB.Counter_u_p_2 > MyLib.MMOQOB.Sleep_p_2) {
      MyLib.MMOQOB.Counter_u_p_2 = 0
      if (
        typeof MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json !== "undefined"
      ) {
        if (
          MyLib.MMOQOB.Counter_p_2 >
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
            MyLib.MMOQOB.Frame_p_2
          ].length -
            1
        ) {
          if (
            MyLib.MMOQOB.Shield_on_p_2 < 6 ||
            MyLib.MMOQOB.Anim_Tmp_2[1] === MyLib.MMOQOB.Shield_on_p_2
          ) {
            cAPlayer_2(
              MyLib.MMOQOB._Anim_p_2,
              MyLib.MMOQOB.Shield_on_p_2,
              MyLib.MMOQOB.Type_p_2,
            )
          }
          MyLib.MMOQOB.Counter_p_2 = 0
        }
      }

      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].x = MyLib.MMOQOB.p_2.x
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].y = MyLib.MMOQOB.p_2.y
      for (var key in MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes) {
        MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[key].visible = false
      }
      if (
        typeof MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json !== "undefined"
      ) {
        for (
          var i = 0;
          i <
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
            MyLib.MMOQOB.Frame_p_2
          ][MyLib.MMOQOB.Counter_p_2][0].length;
          i++
        ) {
          MyLib.MMOQOB.la_n_2 =
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
              MyLib.MMOQOB.Frame_p_2
            ][MyLib.MMOQOB.Counter_p_2][0][i][0]
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
            MyLib.MMOQOB.la_n_2
          ].x =
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
              MyLib.MMOQOB.Frame_p_2
            ][MyLib.MMOQOB.Counter_p_2][0][i][1] +
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
              MyLib.MMOQOB.la_n_2
            ].padding.x
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
            MyLib.MMOQOB.la_n_2
          ].y =
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
              MyLib.MMOQOB.Frame_p_2
            ][MyLib.MMOQOB.Counter_p_2][0][i][2] +
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
              MyLib.MMOQOB.la_n_2
            ].padding.y
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
            MyLib.MMOQOB.la_n_2
          ].rotation =
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
              MyLib.MMOQOB.Frame_p_2
            ][MyLib.MMOQOB.Counter_p_2][0][i][3] * 0.0175
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
            MyLib.MMOQOB.la_n_2
          ].visible = true
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
            MyLib.MMOQOB.la_n_2
          ].zOrder = i
        }

        if (
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].json[
            MyLib.MMOQOB.Frame_p_2
          ][MyLib.MMOQOB.Counter_p_2][1]
        ) {
          if (MyLib.MMOQOB.Anim_Tmp_1[1] === 8) {
            cAPlayer_1(
              MyLib.MMOQOB.Anim_Tmp_1[0],
              9,
              MyLib.MMOQOB.Anim_Tmp_1[2],
            )
          } else {
            cAPlayer_1(
              MyLib.MMOQOB.Anim_Tmp_1[0],
              MyLib.MMOQOB.Anim_Tmp_1[1],
              MyLib.MMOQOB.Anim_Tmp_1[2],
            )
          }

          MyLib.MMOQOB.Anim_Tmp_1[1] = MyLib.MMOQOB.Shield_on_p_1
          MyLib.MMOQOB.Counter_u_p_1 = 999
          if (MyLib.MMOQOB.bTmp.length !== 0) {
            MyLib.MMOQOB.Hp_p_1 = MyLib.MMOQOB.bTmp[0]
            MyLib.MMOQOB.Hp_p_2 = MyLib.MMOQOB.bTmp[1]
            MyLib.MMOQOB.Effect_p_1 = MyLib.MMOQOB.bTmp[2]
            MyLib.MMOQOB.Effect_p_2 = MyLib.MMOQOB.bTmp[3]
            MyLib.MMOQOB.bTmp = []
          }
        }
        MyLib.MMOQOB.Counter_p_2++
      }
    }
    MyLib.MMOQOB.a_n_2 = 0
    drawEffects(delta)
    if (MyLib.MMOQOB.p_2.move !== 0) {
      p_2_Move(delta)
    }

    if (MyLib.MMOQOB.p_1.move !== 0 || MyLib.MMOQOB.p_2.move !== 0) {
      MyLib.MMOQOB.buttonContainer.visible = 0
    } else {
      MyLib.MMOQOB.buttonContainer.visible = MyLib.MMOQOB.buttVis
      AutoBattleConfig()
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
MyLib.MMOQOB.buttVis = 0
changeWeapon_p_1 = function (weapon) {
  try {
    if (MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].type === 0) {
      MyLib.MMOQOB.Weapon_p_1 = weapon
      MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes["0"].texture =
        MyLib.MMOQOB.weaponTextures[weapon]
      MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes["0"].pivot.x =
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes["0"].texture.left
      MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes["0"].pivot.y =
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes["0"].texture.top
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeWeapon_p_2 = function (weapon) {
  try {
    if (MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].type === 0) {
      MyLib.MMOQOB.Weapon_p_2 = weapon
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes["0"].texture =
        MyLib.MMOQOB.weaponTextures[weapon]
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes["0"].pivot.x =
        MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes["0"].texture.left
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes["0"].pivot.y =
        MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes["0"].texture.top
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeCl_p_1 = function (arr) {
  try {
    //arr = [64,73,...]
    for (var key in MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes) {
      if (key != 0) {
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
          key
        ].texture = PIXI.Texture.from(
          MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].path + key + ".png",
        )
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[key].padding.x = 0
        MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[key].padding.y = 0
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (
        typeof MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1] !== "undefined" &&
        typeof MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]] !== "undefined"
      ) {
        for (
          var ii = 0;
          ii < MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]].length;
          ii++
        ) {
          if (
            typeof MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][0]
            ] !== "undefined"
          ) {
            MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][0]
            ].texture = PIXI.Texture.from(
              "../img/skin/thing/" +
                MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][1] +
                ".png",
            )
            MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][0]
            ].padding.x =
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][2]
            MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][0]
            ].padding.y =
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_1][arr[i]][ii][3]
          }
        }
      }
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeCl_p_2 = function (arr) {
  try {
    //arr = [64,73,...]
    for (var key in MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes) {
      if (key != 0) {
        MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
          key
        ].texture = PIXI.Texture.from(
          MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].path + key + ".png",
        )
        MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[key].padding.x = 0
        MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[key].padding.y = 0
      }
    }
    for (var i = 0; i < arr.length; i++) {
      if (
        typeof MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2] !== "undefined" &&
        typeof MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]] !== "undefined"
      ) {
        for (
          var ii = 0;
          ii < MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]].length;
          ii++
        ) {
          if (
            typeof MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][0]
            ] !== "undefined"
          ) {
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][0]
            ].texture = PIXI.Texture.from(
              "../img/skin/thing/" +
                MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][1] +
                ".png",
            )
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][0]
            ].padding.x =
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][2]
            MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].clothes[
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][0]
            ].padding.y =
              MyLib.MMOQOB.clObj[MyLib.MMOQOB.Anim_p_2][arr[i]][ii][3]
          }
        }
      }
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
cAPlayer_1 = function (player, animation, type) {
  try {
    if (typeof MyLib.MMOQOB.p_1.arr[type + "_" + player] == "undefined") {
      MyLib.MMOQOB.p_1.arr[type + "_" + player] = loadPlayer(player, 2, type)
      MyLib.MMOQOB.playerContainers[0].addChild(
        MyLib.MMOQOB.p_1.arr[type + "_" + player],
      )
    }
    for (var key in MyLib.MMOQOB.p_1.arr) {
      MyLib.MMOQOB.p_1.arr[key].visible = false
    }

    MyLib.MMOQOB.Anim_p_1 = player
    MyLib.MMOQOB.Type_p_1 = type
    if (animation != "") {
      MyLib.MMOQOB.Frame_p_1 = animation
    } else {
      MyLib.MMOQOB.Frame_p_1 = 0
    }
    MyLib.MMOQOB.Counter_p_1 = 0
    MyLib.MMOQOB.Counter_u_p_1 = 0
    MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].lastFrame = 999
    MyLib.MMOQOB.p_1.arr[MyLib.MMOQOB.Anim_p_1].visible = true
    changeWeapon_p_1(MyLib.MMOQOB.Weapon_p_1)
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
cAPlayer_2 = function (player, animation, type) {
  try {
    if (typeof MyLib.MMOQOB.p_2.arr[type + "_" + player] == "undefined") {
      MyLib.MMOQOB.p_2.arr[type + "_" + player] = loadPlayer(player, 3, type)
      MyLib.MMOQOB.playerContainers[1].addChild(
        MyLib.MMOQOB.p_2.arr[type + "_" + player],
      )
    }
    for (var key in MyLib.MMOQOB.p_2.arr) {
      MyLib.MMOQOB.p_2.arr[key].visible = false
    }
    MyLib.MMOQOB.Anim_p_2 = player
    MyLib.MMOQOB.Type_p_2 = type
    if (animation != "") {
      MyLib.MMOQOB.Frame_p_2 = animation
    } else {
      MyLib.MMOQOB.Frame_p_2 = 0
    }
    MyLib.MMOQOB.Counter_p_2 = 0
    MyLib.MMOQOB.Counter_u_p_2 = 0
    MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].lastFrame = 999
    MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].visible = true
    changeWeapon_p_2(MyLib.MMOQOB.Weapon_p_2)
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
loadPlayer = function (player, layerGroups, type) {
  try {
    var playerContainer = new PIXI.Container()
    playerContainer.x = -300
    playerContainer.type = type
    playerContainer.clothes = {}
    if (type === 0) {
      var json = MyLib.MMOQOB.jsonPlayer
      var keyA = player
      playerContainer.clothesPath = "../img/skin/0/" + keyA + "/"
      playerContainer.path = "../img/skin/0/" + keyA + "/"
    } else {
      var json = MyLib.MMOQOB.jsonMob
      if (player < 2) {
        playerContainer.clothesPath = "../img/skin/1/0/"
        playerContainer.path = "../img/skin/1/0/"
      } else {
        playerContainer.clothesPath = "../img/skin/1/" + (player - 1) + "/"
        playerContainer.path = "../img/skin/1/" + (player - 1) + "/"
      }
      player = json.keyToAnim[player]
    }

    try {
      var numEl = 0
      //animations
      for (var iii = 0; iii < 10; iii++) {
        //frames
        if (
          typeof json[player] !== "undefined" &&
          typeof json[player][iii] !== "undefined"
        ) {
          for (var ii = 0; ii < json[player][iii].length; ii++) {
            //slice
            for (var i = 0; i < json[player][iii][ii][0].length; i++) {
              if (
                typeof json[player][iii][ii] !== "undefined" &&
                typeof json[player][iii][ii][0][i] !== "undefined"
              ) {
                numEl = json[player][iii][ii][0][i][0]
                if (typeof playerContainer.clothes[numEl] === "undefined") {
                  playerContainer.clothes[numEl] = new PIXI.Sprite()
                  playerContainer.clothes[numEl].texture = PIXI.Texture.from(
                    playerContainer.clothesPath + numEl + ".png",
                  )
                  playerContainer.clothes[numEl].anchor.set(0.5, 0.5)
                  playerContainer.clothes[numEl].parentGroup =
                    MyLib.MMOQOB.layerGroups[layerGroups]
                  playerContainer.clothes[numEl].padding = { x: 0, y: 0 }
                  playerContainer.addChild(playerContainer.clothes[numEl])
                }
              }
            }
          }
        } else {
        }
      }
      playerContainer.json = json[player]
    } catch (e) {}
    return playerContainer
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
buttonDownBattle = function () {
  try {
    BInfo(this.value)
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
buttonUpBattle = function () {
  try {
    this.alpha = 1
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
buttonOutBattle = function () {
  try {
    this.alpha = 1
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeName_p_1 = function (name) {
  try {
    MyLib.MMOQOB.svitokNameL.label.text = name
    MyLib.MMOQOB.svitokNameL.width =
      MyLib.MMOQOB.svitokNameL.label.width + MyLib.MMOQOB.svitokNameL.height
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeName_p_2 = function (name) {
  try {
    MyLib.MMOQOB.svitokNameR.label.text = name
    MyLib.MMOQOB.svitokNameR.width =
      MyLib.MMOQOB.svitokNameR.label.width + MyLib.MMOQOB.svitokNameR.height
    MyLib.MMOQOB.svitokNameR.pivot.x = MyLib.MMOQOB.svitokNameR.width
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeHp_p_1 = function (hp) {
  try {
    hp = "" + hp
    for (var i = 0; i < 6; i++) {
      if (i < hp.length) {
        MyLib.MMOQOB.numberLeftHp[i].texture =
          MyLib.MMOQOB.numberTextures[hp[i]]
      } else {
        MyLib.MMOQOB.numberLeftHp[i].texture = null
      }
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
changeHp_p_2 = function (hp) {
  try {
    hp = ("" + hp).split("").reverse().join("")
    for (var i = 0; i < 6; i++) {
      if (i < hp.length) {
        MyLib.MMOQOB.numberRightHp[i].texture =
          MyLib.MMOQOB.numberTextures[hp[i]]
      } else {
        MyLib.MMOQOB.numberRightHp[i].texture = null
      }
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
setFonBattle = function (e) {
  try {
    if (e[0] == 0) {
      //обычный фон
      MyLib.MMOQOB.location.texture = PIXI.Texture.from(
        MyLib.MMOQOB.sprites.location[e[1]],
      )
    } else {
      //фон боя
      MyLib.MMOQOB.location.texture = PIXI.Texture.from(
        MyLib.MMOQOB.sprites.location_b[e[1]],
      )
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
setBattleTheme = function (e) {
  try {
    document.getElementById("battle_0").appendChild(MyLib.MMOQOB.app.view)
    if (e === 1) {
      MyLib.MMOQOB.ramka.texture = PIXI.Texture.from(
        MyLib.MMOQOB.sprites.ramka[1],
      )
    } else {
      MyLib.MMOQOB.ramka.texture = PIXI.Texture.from(
        MyLib.MMOQOB.sprites.ramka[0],
      )
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
//задать ширину по ширине экрана если высота позволяет
resizeBattle = function () {
  try {
    if (MyLib.MMOQOB.bVar === 0) {
      //window.innerHeight * 0.06
      var coeff = MyLib.MMOQOB.bHeight / MyLib.MMOQOB.bWidth
      var PixelRatioH = (window.innerHeight * 0.94) / MyLib.MMOQOB.bHeight
      var width = MyLib.MMOQOB.bWidth * PixelRatioH
      var height = MyLib.MMOQOB.bHeight * PixelRatioH
      if (width > window.innerWidth) {
        width = window.innerWidth
        height = width * coeff
      }
      if (height > window.innerHeight * 0.94) {
        height = window.innerHeight * 0.94
        width = height / coeff
      }
      MyLib.MMOQOB.app.renderer.view.style.width = width + "px"
      MyLib.MMOQOB.app.renderer.view.style.height = height + "px"
      MyLib.MMOQOB.app.view.width = MyLib.MMOQOB.bWidth
      MyLib.MMOQOB.app.view.height = MyLib.MMOQOB.bHeight
      MyLib.MMOQOB.app.renderer.screen.width = MyLib.MMOQOB.bWidth
      MyLib.MMOQOB.app.renderer.screen.height = MyLib.MMOQOB.bHeight
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
startBattle = function (a, b, c, d) {
  try {
    if (MyLib.MMOQOB.bLoaded === 1) {
      MyLib.MMOQOB.button[3].alpha = 0.7 + Math.random() * 0.2
      MyLib.MMOQOB.button[0].alpha = MyLib.MMOQOB.button[1].alpha = MyLib.MMOQOB.button[2].alpha =
        0.9 + Math.random() * 0.1
      MyLib.MMOQOB.bVar = 0
      MyLib.MMOQOB.bRun = 1
      MyLib.MMOQOB.p_1.move = 0
      MyLib.MMOQOB.p_2.move = 0
      MyLib.MMOQOB.loadingFlag = 0
      MyLib.MMOQOB.p_1.x = 140
      MyLib.MMOQOB.p_2.x = -140
      MyLib.MMOQOB.effects_1.forEach(function (item, index, obj) {
        MyLib.MMOQOB.app.stage.removeChild(item)
      })
      MyLib.MMOQOB.effects_1 = []
      MyLib.MMOQOB.effects_2.forEach(function (item, index, obj) {
        MyLib.MMOQOB.app.stage.removeChild(item)
      })
      MyLib.MMOQOB.effects_2 = []
      MyLib.MMOQOB.Butil_p_1 = []
      MyLib.MMOQOB.suArray = [] // массив су
      MyLib.MMOQOB.tecSuArray = 0 //Текущее место в массиве

      MyLib.MMOQOB.p_1.y = 270
      MyLib.MMOQOB.location.visible = true
      MyLib.MMOQOB.ramka.visible = true
      MyLib.MMOQOB.leftHpContainer.visible = true
      MyLib.MMOQOB.rightHpContainer.visible = true
      MyLib.MMOQOB.rightHpContainer.visible = true
      MyLib.MMOQOB.svitokNameL.visible = true
      MyLib.MMOQOB.svitokNameR.visible = true
      MyLib.MMOQOB.playerContainers[1].visible = true
      MyLib.MMOQOB.button[3].visible = true
      MyLib.MMOQOB.Weapon_p_1 = c
      MyLib.MMOQOB.Name_p_1 = d
      BInfo()
      setBattleTheme(a)
      setFonBattle(b)
      resizeBattle()
    } else {
      setTimeout(function () {
        startBattle(a, b, c, d)
      }, 100)
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
stopBattle = function () {
  MyLib.MMOQOB.bRun = 0
}
p_2_Move = function (delta) {
  try {
    if (MyLib.MMOQOB.p_2.move > 0) {
      if (MyLib.MMOQOB.p_2.x < 140) {
        MyLib.MMOQOB.p_2.x += 7 * delta
      }
      if (MyLib.MMOQOB.p_2.x >= 140) {
        MyLib.MMOQOB.p_2.x = 140
        MyLib.MMOQOB.p_2.moveEnd = MyLib.MMOQOB.p_2.move
        MyLib.MMOQOB.p_2.move = 0
        if (typeof MyLib.MMOQOB.aTmp.Pico !== "undefined") {
          if (MyLib.MMOQOB.aTmp.Pico !== "" && MyLib.MMOQOB.aTmp.Mico !== "") {
            if (
              MyLib.MMOQOB.aTmp.Panimation >= 2 &&
              MyLib.MMOQOB.aTmp.Panimation <= 5
            ) {
              cAPlayer_1(
                MyLib.MMOQOB.aTmp.Pico,
                MyLib.MMOQOB.aTmp.Panimation,
                MyLib.MMOQOB.aTmp.Ptype,
              )
              MyLib.MMOQOB.Shield_on_p_2 = MyLib.MMOQOB.aTmp.Manimation
            } else if (
              MyLib.MMOQOB.aTmp.Manimation >= 2 &&
              MyLib.MMOQOB.aTmp.Manimation <= 5
            ) {
              cAPlayer_2(
                MyLib.MMOQOB.aTmp.Mico,
                MyLib.MMOQOB.aTmp.Manimation,
                MyLib.MMOQOB.aTmp.Mtype,
              )
              MyLib.MMOQOB.Shield_on_p_1 = MyLib.MMOQOB.aTmp.Panimation
            } else {
              cAPlayer_1(
                MyLib.MMOQOB.aTmp.Pico,
                MyLib.MMOQOB.aTmp.Panimation,
                MyLib.MMOQOB.aTmp.Ptype,
              )
              cAPlayer_2(
                MyLib.MMOQOB.aTmp.Mico,
                MyLib.MMOQOB.aTmp.Manimation,
                MyLib.MMOQOB.aTmp.Mtype,
              )
            }
            MyLib.MMOQOB.Hp_p_1 = MyLib.MMOQOB.aTmp.Plife
            MyLib.MMOQOB.Hp_p_2 = MyLib.MMOQOB.aTmp.Mlife
          }
          MyLib.MMOQOB.aTmp = {}
        }
      }
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].x = MyLib.MMOQOB.p_2.x
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].y = MyLib.MMOQOB.p_2.y
    } else if (MyLib.MMOQOB.p_2.move < 0) {
      if (MyLib.MMOQOB.p_2.x > -140) {
        MyLib.MMOQOB.p_2.x -= 7 * delta
      }
      if (MyLib.MMOQOB.p_2.x <= -140) {
        MyLib.MMOQOB.p_2.x = -140
        MyLib.MMOQOB.p_2.moveEnd = MyLib.MMOQOB.p_2.move
        MyLib.MMOQOB.p_2.move = 0
        //меняем скин когда ушел
        if (typeof MyLib.MMOQOB.aTmp.Pico !== "undefined") {
          if (MyLib.MMOQOB.aTmp.Pico !== "") {
            MyLib.MMOQOB.Hp_p_1 = MyLib.MMOQOB.aTmp.PlifeStart
            changeCl_p_1(MyLib.MMOQOB.aTmp.Pclothes)
          }
          if (MyLib.MMOQOB.aTmp.Mico !== "") {
            cAPlayer_2(MyLib.MMOQOB.aTmp.Mico, 0, MyLib.MMOQOB.aTmp.Mtype)
            MyLib.MMOQOB.Hp_p_2 = MyLib.MMOQOB.aTmp.MlifeStart
            MyLib.MMOQOB.Name_p_2 = MyLib.MMOQOB.aTmp.Mname
            MyLib.MMOQOB.Weapon_p_2 = MyLib.MMOQOB.aTmp.Mweapon
            changeCl_p_2(MyLib.MMOQOB.aTmp.Mclothes)
          }
        }
        if (MyLib.MMOQOB.p_2.id > 0) {
          MyLib.MMOQOB.p_2.move = 1
        }
        MyLib.MMOQOB.Shield_on_p_2 = 0
        MyLib.MMOQOB.aTmp.Manimation = 0
      }
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].x = MyLib.MMOQOB.p_2.x
      MyLib.MMOQOB.p_2.arr[MyLib.MMOQOB.Anim_p_2].y = MyLib.MMOQOB.p_2.y
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
//        MMOQOA.p_1 = {
//            x: 140,
//            y: 270,
//            arr: {}
//        };
MyLib.MMOQOB.aAll = []
MyLib.MMOQOB.aTmp = {}
MyLib.MMOQOB.bTmp = []
MyLib.MMOQOB.Anim_Tmp_1 = [0, 0, 0]
MyLib.MMOQOB.Anim_Tmp_2 = [0, 0, 0]
parseDataBattle = function (data) {
  try {
    if (typeof data !== "undefined") {
      $(".loading").remove()
      if (data.error == 99) {
        if ($(".msg").length != 0) {
          $(".msg").remove()
        }
        messages("От начала боя должно пройти 10 минут")
      }
      if (data.BattleResult == 5) {
        Eleksirmsg()
      }
      if (data.BattleResult === 1) {
        MyLib.footName = "huntresult"
        MyLib.MMOQOB.bRun = 0
        MyLib.MMOQOB.loadingFlag = 1
        clearTimeout(MyLib.battleSetTimeid[9003])
        showContent("/hunt/result.php")
      } else {
        //[[id2,type,name,ico,weapon,hpstart,hpend,shield,anim1,anim2,effectsentity1,effectsentity2]]
        //[[70535649, 1, " ", 2, 0, 7685, 7685, 30, -970, 0, 5, 8, [], [[10, -30], [8, -1000]]]]
        //если есть анимация то зададим ее
        if (data.Plast_anim.length !== 0) {
          MyLib.MMOQOB.aAll = data.Plast_anim[data.Plast_anim.length - 1]
          data.lost_mob_id = MyLib.MMOQOB.aAll[0]
          data.Mtype = MyLib.MMOQOB.aAll[1]
          data.Mname = ""
          data.Mico = MyLib.MMOQOB.aAll[3]
          data.Mweapon = MyLib.MMOQOB.aAll[4]
          data.PlifeStart = MyLib.MMOQOB.aAll[5]
          if (MyLib.MMOQOB.aAll[6] < 0) {
            MyLib.MMOQOB.aAll[6] = 0
            data.Plife = MyLib.MMOQOB.aAll[6]
          }
          data.MlifeStart = MyLib.MMOQOB.aAll[7]
          if (MyLib.MMOQOB.aAll[6] < 0) {
            MyLib.MMOQOB.aAll[8] = 0
            data.Mlife = MyLib.MMOQOB.aAll[8]
          }
          data.Panimation = MyLib.MMOQOB.aAll[10]
          data.Manimation = MyLib.MMOQOB.aAll[11]
          data.Pentityarr = JSON.stringify(MyLib.MMOQOB.aAll[12])
          data.Mentityarr = JSON.stringify(MyLib.MMOQOB.aAll[13])
          data.Pclothes = MyLib.MMOQOB.aAll[14]
          data.Mclothes = MyLib.MMOQOB.aAll[15]
        } else {
          data.PlifeStart = data.Plife
          data.MlifeStart = data.Mlife
        }

        if (MyLib.MMOQOB.p_2.id !== data.lost_mob_id) {
          MyLib.MMOQOB.aTmp = data
          MyLib.MMOQOB.p_2.id = data.lost_mob_id
          MyLib.MMOQOB.p_2.move = -1
        } else if (MyLib.MMOQOB.p_2.id > 0) {
          MyLib.MMOQOB.p_2.move = 1
          if (data.Plife !== "" && data.Plife <= 0) {
            data.Pshield = 7
            if (data.Panimation < 2 && data.Panimation > 5) {
              data.Panimation = 7
            }
          }
          if (data.Mlife !== "" && data.Mlife <= 0) {
            if (data.Manimation < 2 && data.Manimation > 5) {
              data.Manimation = 7
            }
            data.Mshield = 7
          }

          if (data.Mname !== "") {
            MyLib.MMOQOB.Name_p_2 = data.Mname
          }
          if (data.Mweapon !== "") {
            MyLib.MMOQOB.Weapon_p_2 = data.Mweapon
          }

          if (
            data.Panimation !== MyLib.MMOQOB.Frame_p_1 &&
            data.Panimation < 7
          ) {
            cAPlayer_1(data.Pico, data.Panimation, data.Ptype)
          }

          if (
            data.Manimation !== MyLib.MMOQOB.Frame_p_2 &&
            data.Manimation < 7
          ) {
            cAPlayer_2(data.Mico, data.Manimation, data.Mtype)
          }
          if (
            (data.Panimation < 2 || data.Panimation > 5) &&
            (data.Manimation < 2 || data.Manimation > 5)
          ) {
            MyLib.MMOQOB.Hp_p_1 = data.Plife
            MyLib.MMOQOB.Hp_p_2 = data.Mlife
            MyLib.MMOQOB.Effect_p_1 = JSON.parse(data.Pentityarr)
            MyLib.MMOQOB.Effect_p_2 = JSON.parse(data.Mentityarr)
          } else {
            MyLib.MMOQOB.bTmp = [
              data.Plife,
              data.Mlife,
              JSON.parse(data.Pentityarr),
              JSON.parse(data.Mentityarr),
              data.Pclothes,
              data.Mclothes,
            ]
          }

          changeCl_p_1(data.Pclothes)
          changeCl_p_2(data.Mclothes)
        }
        if (data.Pico !== "") {
          MyLib.MMOQOB.Anim_Tmp_1[0] = data.Pico
          MyLib.MMOQOB.Anim_Tmp_1[1] = data.Panimation
          MyLib.MMOQOB.Anim_Tmp_1[2] = data.Ptype
        }
        if (data.Mico !== "") {
          MyLib.MMOQOB.Anim_Tmp_2[0] = data.Mico
          MyLib.MMOQOB.Anim_Tmp_2[1] = data.Manimation
          MyLib.MMOQOB.Anim_Tmp_2[2] = data.Mtype
        }

        MyLib.MMOQOB.buttVis = data.Buttonvisible
        if (data.ButtonBattleColorCount !== "") {
          MyLib.MMOQOB.button[0].texture = PIXI.Texture.from(
            MyLib.MMOQOB.sprites.button[data.ButtonBattleColorCount][0],
          )
          MyLib.MMOQOB.button[1].texture = PIXI.Texture.from(
            MyLib.MMOQOB.sprites.button[data.ButtonBattleColorCount][1],
          )
          MyLib.MMOQOB.button[2].texture = PIXI.Texture.from(
            MyLib.MMOQOB.sprites.button[data.ButtonBattleColorCount][2],
          )
        }
        if (data.Pname !== "") {
          MyLib.MMOQOB.Name_p_1 = data.Pname
        }
        MyLib.MMOQOB.Weapon_p_1 = data.Pweapon
        MyLib.MMOQOB.Shield_p_1 = data.PshieldNC
        if (data.Panimation === 8 && data.Plife > 0) {
          MyLib.MMOQOB.Shield_on_p_1 = data.Pshield = 8
        } else {
          MyLib.MMOQOB.Shield_on_p_1 = data.Pshield
        }

        if (data.Manimation === 8 && data.Mlife > 0) {
          MyLib.MMOQOB.Shield_on_p_2 = data.Mshield = 8
        } else {
          MyLib.MMOQOB.Shield_on_p_2 = data.Mshield
        }
        if (data.PeleksirVisible) {
          MyLib.MMOQOB.Butil_p_1 = data.PeleksirNCarr
        } else {
          MyLib.MMOQOB.Butil_p_1 = []
        }
        if (data.Pshield) {
          MyLib.MMOQOB.shield.tilePosition.x = -75 * MyLib.MMOQOB.buttonScale
        } else {
          MyLib.MMOQOB.shield.tilePosition.x = 0 * MyLib.MMOQOB.buttonScale
        }
      }
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
MyLib.MMOQOB.loadingFlag = 0
BInfo = function (i) {
  try {
    if (MyLib.MMOQOB.loadingFlag == 0 && MyLib.MMOQOB.bVar === 0) {
      MyLib.MMOQOB.loadingFlag = 1
      if (!$("img").is(".loading") && i >= 0 && i < 11) {
        document.body.appendChild(imgLoading)
      }
      clearTimeout(MyLib.battleSetTimeid[9003])
      $.ajax({
        type: "POST",
        url: "./php/BInfo.php",
        dataType: "json",
        data: {
          numClick: 1 + i,
        },
        success: function (a) {
          parseDataBattle(a)
          MyLib.battleSetTimeid[9003] = setTimeout(function () {
            BInfo()
          }, 2000)
          MyLib.MMOQOB.loadingFlag = 0
        },
        error: function () {
          MyLib.battleSetTimeid[9003] = setTimeout(function () {
            BInfo()
          }, 2000)
          MyLib.MMOQOB.loadingFlag = 0
        },
      })
    } else {
      MyLib.battleSetTimeid[9003] = setTimeout(function () {
        BInfo(i)
      }, 200)
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
Set_Profile = function (rasa, type, weapon, clothes, width, height, x, y) {
  try {
    if (MyLib.MMOQOB.bLoaded === 1) {
      MyLib.MMOQOB.effects_1.forEach(function (item, index, obj) {
        MyLib.MMOQOB.app.stage.removeChild(item)
      })
      MyLib.MMOQOB.effects_1 = []
      MyLib.MMOQOB.effects_2.forEach(function (item, index, obj) {
        MyLib.MMOQOB.app.stage.removeChild(item)
      })
      MyLib.MMOQOB.effects_2 = []
      $(".monster_here").eq(-1).append(MyLib.MMOQOB.app.view)
      var shield = Math.round(Math.random())
      MyLib.MMOQOB.Shield_on_p_1 = shield
      cAPlayer_1(rasa, shield, type)
      MyLib.MMOQOB.Weapon_p_1 = weapon
      changeCl_p_1(clothes)
      MyLib.MMOQOB.bVar = 1
      MyLib.MMOQOB.p_1.x = x
      MyLib.MMOQOB.p_1.y = y
      MyLib.MMOQOB.app.renderer.view.style.width = width + "px"
      MyLib.MMOQOB.app.renderer.view.style.height = height + "px"
      MyLib.MMOQOB.app.view.width = width
      MyLib.MMOQOB.app.view.height = height
      MyLib.MMOQOB.app.renderer.screen.width = width
      MyLib.MMOQOB.app.renderer.screen.height = height
      MyLib.MMOQOB.location.visible = false
      MyLib.MMOQOB.ramka.visible = false
      MyLib.MMOQOB.leftHpContainer.visible = false
      MyLib.MMOQOB.rightHpContainer.visible = false
      MyLib.MMOQOB.rightHpContainer.visible = false
      MyLib.MMOQOB.svitokNameL.visible = false
      MyLib.MMOQOB.svitokNameR.visible = false
      MyLib.MMOQOB.playerContainers[1].visible = false
      MyLib.MMOQOB.button[3].visible = false
      MyLib.MMOQOB.bRun = 1
    } else {
      setTimeout(function () {
        Set_Profile(rasa, type, weapon, clothes, width, height, x, y)
      }, 100)
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
MyLib.MMOQOB.autoBattle = false
MyLib.MMOQOB.suArray = []
MyLib.MMOQOB.tecSuArray = 0
MyLib.MMOQOB.userSu = []
AutoBattle = function () {
  try {
    if (MyLib.MMOQOB.bLoaded === 1) {
      MyLib.MMOQOB.autoBattle = !MyLib.MMOQOB.autoBattle
      if (MyLib.MMOQOB.autoBattle) {
        MyLib.MMOQOB.button[3].texture = PIXI.Texture.from(
          MyLib.MMOQOB.sprites.button[3][0],
        )
        AutoBattleConfig()
      } else {
        MyLib.MMOQOB.button[3].texture = PIXI.Texture.from(
          MyLib.MMOQOB.sprites.button[3][1],
        )
      }
    } else {
      setTimeout(function () {
        AutoBattle()
      }, 100)
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}

AutoBattleConfig = function () {
  try {
    if (MyLib.MMOQOB.suArray.length == 0 && MyLib.MMOQOB.userSu.length > 0) {
      CreateSuArray()
    }

    if (MyLib.MMOQOB.autoBattle && 1 === MyLib.MMOQOB.buttVis) {
      MyLib.MMOQOB.buttVis = 0
      MyLib.MMOQOB.buttonContainer.visible = false
      setTimeout(function () {
        if (MyLib.MMOQOB.tecSuArray < MyLib.MMOQOB.suArray.length) {
          BInfo(MyLib.MMOQOB.suArray[MyLib.MMOQOB.tecSuArray] - 1)
        } else {
          BInfo(RandomInteger(0, 2))
        }
        MyLib.MMOQOB.tecSuArray++
      }, 100)
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}

RandomInteger = function (min, max) {
  try {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1))
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}

CreateSuArray = function () {
  try {
    if (Number.parseInt === undefined) {
      Number.parseInt = window.parseInt
    }

    for (var i = 0; i < MyLib.MMOQOB.userSu.length; i++) {
      var intSu = Number.parseInt(MyLib.MMOQOB.userSu[i])
      if (Number.isInteger(intSu)) {
        MyLib.MMOQOB.suArray.push(intSu)
      }
    }
  } catch (e) {
    console.log("Ошибка " + e.name + ":" + e.message + "\n" + e.stack)
  }
}
