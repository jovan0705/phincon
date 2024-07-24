export const typeColor = (type) => {
    switch(type) {
        case "normal": 
        return "#bcbdae"
        case "fighting": 
        return "#aa5546"
        case "flying": 
        return "#7aa5ff"
        case "poison": 
        return "#a85da0"
        case "ground": 
        return "#eecb56"
        case "rock": 
        return "#cfbd73"
        case "bug": 
        return "#c3d21f"
        case "ghost": 
        return "#7a76d7"
        case "steel": 
        return "#c4c2d8"
        case "fire": 
        return "#fb5643"
        case "water": 
        return "#55aefe"
        case "grass": 
        return "#8cd852"
        case "electric": 
        return "#fce53d"
        case "psychic": 
        return "#f964b5"
        case "ice": 
        return "#95f1fe"
        case "dragon": 
        return "#7e6eee"
        case "dark": 
        return "#8e6956"
        case "fairy": 
        return "#faadff"
        case "stellar": 
        return "#faadff"
        case "unknown": 
        return "#bcbdae"
        default: 
        return "#bcbdae"
    }
}