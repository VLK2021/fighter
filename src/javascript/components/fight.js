import controls from '../../constants/controls';

function calcDamage(attacker, defender) {
    return attacker.attack - (defender.isBlocking ? defender.defense : 0);
}

function updateHealthBar(healthBar, currentHealth, totalHealth) {
    const percentage = (currentHealth > 0 ? currentHealth / totalHealth : 0) * 100;
    // eslint-disable-next-line no-param-reassign
    healthBar.style.width = `${percentage}%`;
}

// function updateHealthBar(healthBar, currentHealth, totalHealth) {
//     const percentage = (currentHealth > 0 ? (currentHealth / totalHealth) : 0) * 100;
//     healthBar.style = { ...healthBar.style, width: `${percentage}%` };
// }

function isCriticalHitKeyPressed(keyPressed, criticalHitCombination) {
    return criticalHitCombination.every(val => keyPressed.has(val));
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const playerOne = {
            ...firstFighter,
            isBlocking: false,
            currentHealth: firstFighter.health,
            isCritReady: true
        };
        const playerTwo = {
            ...secondFighter,
            isBlocking: false,
            currentHealth: secondFighter.health,
            isCritReady: true
        };
        const playerOneHealthBar = document.querySelector('#left-fighter-indicator');
        const playerTwoHealthBar = document.querySelector('#right-fighter-indicator');
        const keyPressed = new Set();

        window.addEventListener('keydown', e => {
            switch (e.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = true;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = true;
                    break;
                default:
                    if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
                        keyPressed.add(e.code);
                    }
                    if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
                        keyPressed.add(e.code);
                    }
                    break;
            }
        });

        window.addEventListener('keyup', e => {
            switch (e.code) {
                case controls.PlayerOneAttack:
                    if (playerOne.isBlocking || playerTwo.isBlocking) break;
                    playerTwo.currentHealth -= calcDamage(playerOne, playerTwo);
                    updateHealthBar(playerTwoHealthBar, playerTwo.currentHealth, playerTwo.health);
                    if (playerTwo.currentHealth <= 0) {
                        resolve(playerOne);
                    }
                    break;
                case controls.PlayerTwoAttack:
                    if (playerTwo.isBlocking || playerOne.isBlocking) break;
                    playerOne.currentHealth -= calcDamage(playerTwo, playerOne);
                    updateHealthBar(playerOneHealthBar, playerOne.currentHealth, playerOne.health);
                    if (playerOne.currentHealth <= 0) {
                        resolve(playerTwo);
                    }
                    break;
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = false;
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = false;
                    break;
                default:
                    if (
                        isCriticalHitKeyPressed(keyPressed, controls.PlayerOneCriticalHitCombination) &&
                        playerOne.isCritReady
                    ) {
                        playerTwo.currentHealth -= 2 * playerOne.attack;
                        updateHealthBar(playerTwoHealthBar, playerTwo.currentHealth, playerTwo.health);
                        playerOne.isCritReady = false;
                        setTimeout(() => {
                            playerOne.isCritReady = true;
                        }, 10000);
                        if (playerTwo.currentHealth <= 0) {
                            resolve(playerOne);
                        }
                    } else if (
                        isCriticalHitKeyPressed(keyPressed, controls.PlayerTwoCriticalHitCombination) &&
                        playerTwo.isCritReady
                    ) {
                        playerOne.currentHealth -= 2 * playerTwo.attack;
                        updateHealthBar(playerOneHealthBar, playerOne.currentHealth, playerOne.health);
                        playerTwo.isCritReady = false;
                        setTimeout(() => {
                            playerTwo.isCritReady = true;
                        }, 10000);
                        if (playerOne.currentHealth <= 0) {
                            resolve(playerTwo);
                        }
                    }
                    if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
                        keyPressed.delete(e.code);
                    }
                    if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
                        keyPressed.delete(e.code);
                    }
                    break;
            }
        });
    });
}

export function getHitPower(fighter) {
    const { attack } = fighter;
    const criticalHitChance = Math.random() + 1;
    return attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    const { defense } = fighter;
    const dodgeChance = Math.random() + 1;
    return defense * dodgeChance;
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
}
