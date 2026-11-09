#!/usr/bin/env python3
"""
ElevenLabs Audio Generator for Nvidia Investigation Slides.
Generates studio-quality AI narration MP3s for all 8 acts and saves them to
slides/nvidia-investigation/assets/audio/act-[1-8].mp3.

Usage:
    export ELEVENLABS_API_KEY="your-api-key"
    python3 scripts/generate_elevenlabs_audio.py
"""

import os
import sys
import json
import urllib.request
import urllib.error

API_KEY = os.environ.get("ELEVENLABS_API_KEY")
VOICE_ID = os.environ.get("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")  # Default: Rachel (or Adam: "pNInz6obpgDQGcFmaJgB")
OUTPUT_DIR = "slides/nvidia-investigation/assets/audio"

SCRIPTS = [
    # Act 1
    "Welcome, ladies and gentlemen. Behold Jensen Huang in full glory. Three point five trillion dollar market cap. A ninety-eight percent monopoly on artificial intelligence compute. He does not wear suits. He wears the sovereign leather jacket. Every tech titan on earth is begging him for Blackwell B200 allocations. Life could not possibly be better. Until... he booked a flight to Southeast Asia.",
    # Act 2
    "Act Two: Singapore, midnight at Marina Bay Sands. Enter Alice Huang of Megaspeed. U.S. intelligence agencies identify her as an alleged intelligence operative for China's Ministry of State Security. Jensen is completely captivated. Look at those heart eyes—he thinks she's just passionately in love with CUDA parallel computing architecture! A two billion dollar data center deal is signed over dinner.",
    # Act 3
    "Act Three: The Transshipment Pipeline. Fifty thousand state-of-the-art GPUs legally depart Santa Clara bound for Singapore. Suddenly, federal radar lights up in Washington. Why are server clusters in Singapore allegedly being remote-leased to sanctioned Chinese AI developers in Shenzhen? The Bureau of Industry and Security starts tracking cargo vessels across the Pacific.",
    # Act 4
    "Act Four: The 2:00 AM All-Hands Email. Before the tabloids or federal investigators can leak the story, Jensen pulls the ultimate power move: He emails all thirty thousand Nvidia employees at 2:00 in the morning and admits the affair directly. 'I was unfaithful to my wife. There is no excuse. I take full responsibility.' His Slack is melting down, but he draws a hard line: Not a single semiconductor blueprint was ever compromised.",
    # Act 5
    "Act Five: Washington goes DEFCON 1. Capitol Hill turns into an absolute media circus. Donald Trump is waving his arms, his hair is flying off his head, demanding tariffs and treason trials. Congress slams gavels so hard the committee desks are splintering. Jensen raises the Blackwell B200 as a physical shield against the barrage of subpoenas.",
    # Act 6
    "Act Six: The Forensic Crime Lab. The independent board and cybersecurity audit teams go to work. They scan every email, every WeChat text, every circuit schematic. The polygraph scan results come back clear: Infidelity? 100% guilty. National security treason? Zero evidence. The CUDA crown jewels never left Santa Clara.",
    # Act 7
    "Act Seven: The Wall Street Rollercoaster. Premarket trading drops 120 billion dollars in thirty minutes as algorithms panic. Then Wall Street fund managers open their spreadsheets, wipe their foreheads, and remember: AMD cannot supply this volume. Intel is years behind. You literally cannot train frontier AI without Nvidia. The stock bounces off the CUDA moat trampoline and rockets straight to an all-time record high!",
    # Act 8
    "Act Eight: Untouchable. Trump gives a thumbs up. The Fed inspector stamps the file closed. Alice Huang waves goodbye from Singapore with her martini. And Jensen Huang puts on a second pair of sunglasses over his glasses. CEOs can survive scandals when the entire planet runs on their chips. The leather jacket remains undefeated. Thank you very much."
]

def main():
    if not API_KEY:
        print("\033[91mError: ELEVENLABS_API_KEY environment variable is not set.\033[0m")
        print("Please run: export ELEVENLABS_API_KEY='your_api_key_here'")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"

    print(f"🎙️ Generating voiceovers for {len(SCRIPTS)} acts using ElevenLabs voice {VOICE_ID}...\n")

    for idx, text in enumerate(SCRIPTS, start=1):
        output_file = os.path.join(OUTPUT_DIR, f"act-{idx}.mp3")
        print(f"[{idx}/{len(SCRIPTS)}] Generating Act {idx} -> {output_file}...")

        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75
            }
        }

        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "xi-api-key": API_KEY,
                "Content-Type": "application/json",
                "Accept": "audio/mpeg"
            },
            method="POST"
        )

        try:
            with urllib.request.urlopen(req) as resp:
                with open(output_file, "wb") as f:
                    f.write(resp.read())
            print(f"  ✅ Saved: {output_file}")
        except urllib.error.HTTPError as e:
            print(f"  ❌ Failed for Act {idx}: HTTP {e.code} - {e.read().decode('utf-8')}")
            sys.exit(1)

    print("\n🎉 All 8 voiceover tracks successfully generated!")

if __name__ == "__main__":
    main()
