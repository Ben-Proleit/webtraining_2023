class StaticObject{    

    constructor({ x, y, width, height, color}) {
        if(this.constructor == StaticObject)
            throw new Error("Abstract classes can't be instantiated.")
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw(){
        throw new Error("Method 'draw()' must be implemented.")
    }

    interact(){
        throw new Error("Method 'interact()' must be implemented.")
    }

    animate(){
        throw new Error("Method 'animate()' must be implemented.")
    }
}