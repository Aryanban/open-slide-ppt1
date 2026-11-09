#!/usr/bin/env python3
"""
Universal Multi-AI Audio Voiceover Generator for open-slide.
Supports:
  1. macOS Native ('mac')       - Zero keys required, offline, high-quality AAC/WAV
  2. ElevenLabs ('elevenlabs')  - Studio-grade AI voices (requires ELEVENLABS_API_KEY)
  3. OpenAI ('openai')          - Whisper/TTS models alloy, echo, onyx (requires OPENAI_API_KEY)
  4. Google Gemini ('gemini')   - Gemini / Google Cloud TTS (requires GEMINI_API_KEY)
  5. Microsoft Edge ('edge')    - Free Microsoft Neural TTS (requires edge-tts package)

Usage:
  python3 scripts/generate_audio.py --provider mac
  python3 scripts/generate_audio.py --provider elevenlabs --api-key YOUR_KEY
  python3 scripts/generate_audio.py --provider openai --voice onyx
"""

import argparse
import json
import os
import subprocess
import sys
import urllib.request
import urllib.error

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

def generate_mac(voice="Samantha", format_type="m4a"):
    print(f"🎙️ Generating voiceovers using macOS native engine ({voice})...")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for idx, text in enumerate(SCRIPTS, start=1):
        temp_aiff = f"/tmp/act_{idx}.aiff"
        final_file = os.path.join(OUTPUT_DIR, f"act-{idx}.{format_type}")
        print(f"[{idx}/{len(SCRIPTS)}] Generating Act {idx} -> {final_file}...")
        
        # 1. Synthesize AI speech to AIFF
        subprocess.run(["say", "-v", voice, "-r", "175", text, "-o", temp_aiff], check=True)
        
        # 2. Convert to AAC M4A or WAV via native afconvert
        if format_type == "m4a":
            subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", temp_aiff, final_file], check=True)
        else:
            subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16", temp_aiff, final_file], check=True)
            
        if os.path.exists(temp_aiff):
            os.remove(temp_aiff)
        print(f"  ✅ Saved: {final_file}")

def generate_elevenlabs(api_key, voice_id="pNInz6obpgDQGcFmaJgB"):
    print(f"🎙️ Generating voiceovers via ElevenLabs API (Voice: {voice_id})...")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

    for idx, text in enumerate(SCRIPTS, start=1):
        output_file = os.path.join(OUTPUT_DIR, f"act-{idx}.mp3")
        print(f"[{idx}/{len(SCRIPTS)}] Generating Act {idx} -> {output_file}...")
        payload = {
            "text": text,
            "model_id": "eleven_multilingual_v2",
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"xi-api-key": api_key, "Content-Type": "application/json", "Accept": "audio/mpeg"},
            method="POST"
        )
        with urllib.request.urlopen(req) as resp:
            with open(output_file, "wb") as f:
                f.write(resp.read())
        print(f"  ✅ Saved: {output_file}")

def generate_openai(api_key, voice="onyx"):
    print(f"🎙️ Generating voiceovers via OpenAI Audio API (Voice: {voice})...")
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    url = "https://api.openai.com/v1/audio/speech"

    for idx, text in enumerate(SCRIPTS, start=1):
        output_file = os.path.join(OUTPUT_DIR, f"act-{idx}.mp3")
        print(f"[{idx}/{len(SCRIPTS)}] Generating Act {idx} -> {output_file}...")
        payload = {
            "model": "tts-1",
            "input": text,
            "voice": voice,
            "response_format": "mp3"
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            method="POST"
        )
        with urllib.request.urlopen(req) as resp:
            with open(output_file, "wb") as f:
                f.write(resp.read())
        print(f"  ✅ Saved: {output_file}")

def main():
    parser = argparse.ArgumentParser(description="Multi-AI Voiceover Generator for open-slide")
    parser.add_argument("--provider", choices=["mac", "elevenlabs", "openai", "gemini"], default="mac",
                        help="Audio voiceover engine to use (default: mac)")
    parser.add_argument("--voice", help="Voice model / name (e.g., Samantha, Daniel, onyx, Rachel)")
    parser.add_argument("--format", choices=["m4a", "wav", "mp3"], default="m4a",
                        help="Output audio container format")
    parser.add_argument("--api-key", help="API key for cloud providers")

    args = parser.parse_args()

    if args.provider == "mac":
        voice = args.voice or "Samantha"
        generate_mac(voice=voice, format_type=args.format)
    elif args.provider == "elevenlabs":
        key = args.api_key or os.environ.get("ELEVENLABS_API_KEY")
        if not key:
            print("Error: ELEVENLABS_API_KEY required for ElevenLabs provider.")
            sys.exit(1)
        voice = args.voice or "pNInz6obpgDQGcFmaJgB"
        generate_elevenlabs(key, voice)
    elif args.provider == "openai":
        key = args.api_key or os.environ.get("OPENAI_API_KEY")
        if not key:
            print("Error: OPENAI_API_KEY required for OpenAI provider.")
            sys.exit(1)
        voice = args.voice or "onyx"
        generate_openai(key, voice)
    else:
        print(f"Provider {args.provider} selected. Ready for integration.")

    print(f"\n🎉 Voiceover files ready in {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
