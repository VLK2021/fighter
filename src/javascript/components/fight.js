// import controls from '../../constants/controls';
//
// export async function fight(firstFighter, secondFighter) {
//     return new Promise(resolve => {
//         // resolve the promise with the winner when fight is over
//     });
// }

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = Math.random() + 1;
    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = Math.random() + 1;
    const power = defense * dodgeChance;
    return power;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}
