
        // Musical note frequencies (Hz)
        const notes = {
            'js-gaming': 261.63,  // C4
            'js-tech':   329.63,  // E4
            'js-music':  392.00,  // G4
        };

        function playNote(frequency) {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';         // smooth tone (try 'triangle' or 'square')
            oscillator.frequency.value = frequency;

            gainNode.gain.setValueAtTime(0.6, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); // fade out

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.8);
        }

        function response(event) {
            // Remove 'clicked' class from all buttons
            document.querySelector('.js-gaming').classList.remove('clicked');
            document.querySelector('.js-tech').classList.remove('clicked');
            document.querySelector('.js-music').classList.remove('clicked');

            // Add 'clicked' class to the button that was clicked
            event.target.classList.add('clicked');

            // Find which note to play based on button class
            const btn = event.target;
            for (const cls in notes) {
                if (btn.classList.contains(cls)) {
                    playNote(notes[cls]);
                    break;
                }
            }
        }