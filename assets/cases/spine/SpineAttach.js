cc.Class({
    extends: cc.Component,

    properties: {
        skeleton : {
            type: sp.Skeleton,
            default: null,
        },
        targetPrefab : {
            type: cc.Prefab,
            default: null,
        },
        modeLabel : {
            type: cc.Label,
            default: null,
        },
        redBoneName: "",
        greenBoneName: "",
        blueBoneName: "",
    },

    generateAllNodes () {
        let attachUtil = this.skeleton.attachUtil;
        attachUtil.generateAllAttachedNodes();
        let boneNodes = attachUtil.getAttachedNodes(this.redBoneName);
        let boneNode = boneNodes[0];
        if (boneNode) {
            let targetNode = cc.instantiate(this.targetPrefab);
            targetNode.color = cc.color(255, 0, 0);
            boneNode.addChild(targetNode);
        }
        boneNodes = attachUtil.getAttachedNodes(this.blueBoneName);
        boneNode = boneNodes[0];
        if (boneNode) {
            let targetNode = cc.instantiate(this.targetPrefab);
            targetNode.color = cc.color(0, 0, 255);
            boneNode.addChild(targetNode);
        }
        // console.log(attachUtil._attachedNodeArray);
        // console.log(attachUtil._boneIndexToNode);
    },

    destroyAllNodes () {
        let attachUtil = this.skeleton.attachUtil;
        attachUtil.destroyAllAttachedNodes();
        // console.log(attachUtil._attachedNodeArray);
        // console.log(attachUtil._boneIndexToNode);
    },

    destroyUnusual () {
        let attachUtil = this.skeleton.attachUtil;
        let boneNodes = attachUtil.getAttachedNodes("root");
        let boneNode = boneNodes[0];
        if (boneNode) {
            boneNode.destroy();
        }
        // console.log(attachUtil._attachedNodeArray);
        // console.log(attachUtil._boneIndexToNode);
    },

    generateSomeNodes () {
        let attachUtil = this.skeleton.attachUtil;
        let boneNodes = attachUtil.generateAttachedNodes(this.greenBoneName);
        let boneNode = boneNodes[0];
        if (boneNode) {
            let targetNode = cc.instantiate(this.targetPrefab);
            targetNode.color = cc.color(0, 255, 0);
            boneNode.addChild(targetNode);
        }
        // console.log(attachUtil._attachedNodeArray);
        // console.log(attachUtil._boneIndexToNode);
    },

    destroySomeNodes () {
        let attachUtil = this.skeleton.attachUtil;
        attachUtil.destroyAttachedNodes(this.greenBoneName);
        // console.log(attachUtil._attachedNodeArray);
        // console.log(attachUtil._boneIndexToNode);
    },

    changeMode () {
        let isCached = this.skeleton.isAnimationCached();
        if (isCached) {
            this.skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.REALTIME);
            this.modeLabel.string = "cache";
        } else {
            this.skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
            this.modeLabel.string = "realtime";
        }
    },
});