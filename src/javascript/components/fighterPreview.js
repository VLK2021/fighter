import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        const imageFighter = createElement({
            tagName: 'img',
            attributes: {
                src: fighter.source,
                height: '200px'
            }
        });

        const fighterInfoElement = createElement({
            tagName: 'div',
            className: 'fighter-preview___info'
        });

        const { name, attack, defence, health } = fighter;
        fighterInfoElement.innerHTML = `
            <p>Name: ${name}</p>
            <p>Attack: ${attack}</p>
            <p>Defence: ${defence}</p>
            <p>Health: ${health}</p>
        `;

        fighterElement.appendChild(imageFighter);
        fighterElement.appendChild(fighterInfoElement);
    }

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
