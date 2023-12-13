// import controls from '../../constants/controls';
//
// export async function fight(firstFighter, secondFighter) {
//     return new Promise(resolve => {
//         // resolve the promise with the winner when fight is over
//     });
// }

export function getHitPower(fighter) {
    const randomHit = Math.random() + 1;
    const hitPower = fighter.attack * randomHit;
    return hitPower;
}

export function getBlockPower(fighter) {
    const randomBlock = Math.random() + 1;
    const blockPower = fighter.defense * randomBlock;
    return blockPower;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}
