module effect
{
/**
 *	角度缓动旋转
 * @author Kanon
 */
export class RotationEasing
{
	/**
	 * 缓动旋转
	 * @param	originRot		原始的角度
	 * @param	originX			原点位置x
	 * @param	originY			原点位置y
	 * @param	targetX			目标位置X
	 * @param	targetY			目标位置Y
	 * @param	ease			缓存系数
	 * @return	旋转后的角度
	 */
	public static rotate(originRot:number,
						  originX:number, originY:number,
						  targetX:number, targetY:number, ease:number = .1):number
	{
		let dx:number = (originX - targetX);
		let dy:number = (originY - targetY);
		let r:number = Math.atan2(dy, dx);
		let targetRotation = r * 180 / Math.PI;
		if (targetRotation > originRot + 180) targetRotation -= 360;
		if (targetRotation < originRot - 180) targetRotation += 360;
		return (targetRotation - originRot) * ease;
	}
}
}
