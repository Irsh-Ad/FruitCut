// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    RotationNode:cc.Node = null;
    @property(cc.Prefab)
    FruitsPrefab:cc.Prefab = null;
    @property(cc.Node)
    Knife:cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
   RightRotation = true;
   LeftRoation= false;
   collliderManager;
    start () {
        this.collliderManager = cc.director.getCollisionManager();
        this.collliderManager.enabled  = true;
        this.RotationStart();
    }
    RotationStart()
    {
        for(var i =0; i< this.RotationNode.children.length; i++)
        {
            var Fruit = cc.instantiate(this.FruitsPrefab);
            Fruit.parent = this.RotationNode.children[i];
            Fruit.addComponent(cc.PolygonCollider);
            Fruit.addComponent(cc.RigidBody);


        }
    }
    p=1;
    update (dt) {
       if(this.RightRotation)
       {
           var angle = this.RotationNode.angle;
           angle=angle+dt*25;
           this.RotationNode.angle = angle;
       }
       if(this.RotationNode.angle>300)
       {
           this.RightRotation =false;
           this.LeftRoation = true;
       }
       if(this.LeftRoation)
       {
            var angle = this.RotationNode.angle;
            angle=angle-dt*25;
            this.RotationNode.angle = angle;
       }
       if(this.RotationNode.angle<0)
       {
           this.RightRotation =true;
           this.LeftRoation = false;
       }
       this.Knife.setPosition(this.Knife.getPosition().x,this.Knife.getPosition().y+dt*25);
    }
    onCollisionEnter(other,self)
    {
        console.info('on collision enter');
    }
    
    
}
