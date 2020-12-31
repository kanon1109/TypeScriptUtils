/**
 * Created by tangben on 2015/7/10.
 */
import Tree = effect.Tree;
class TreeTest extends egret.Sprite
{
    public constructor()
    {
        super();
        Tree.draw(this.graphics, 275, 600, 60, -Math.PI / 2, 12, 8);
    }
}