/*:
 * @target MZ
 * @plugindesc Displays "hello" if the player does not give input for 1 second.
 * @help
 * This plugin checks for any player input (keyboard, mouse, or touch).
 * If no input is detected for 60 frames (~1 second), it shows a message.
 */

var idleCounter = 1;


    (() => {
        const idle_time = 60; 
                                    

        // Track input
        const _Input_update = Input.update;
        Input.update = function () {
            _Input_update.call(this);
            if (this._latestButton) idleCounter = 0;
        };

        const _TouchInput_update = TouchInput.update;
        TouchInput.update = function () {
            const wasTriggered = this.isTriggered();
            _TouchInput_update.call(this);
            if (wasTriggered || this.isPressed()) idleCounter = 0;
        };

        // update loop
        const _Scene_Map_update = Scene_Map.prototype.update;
        Scene_Map.prototype.update = function () {
            _Scene_Map_update.call(this);

            idleCounter++;

            if (idleCounter >= idle_time) {
                $gamePlayer.setImage("$idleSheet", 0);
                $gamePlayer.setStepAnime(true);
                                                            

            } else if (idleCounter < idle_time) {
                $gamePlayer.setImage("$Character2", 0);
                $gamePlayer.setStepAnime(false);
            }

            idleCounter = Math.max(0, idleCounter);
            idleCounter = Math.min(110, idleCounter);

         
            

        };
    })();




