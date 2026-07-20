import subprocess
import os

env_file = ".env"
if not os.path.exists(env_file):
    print("No .env file found!")
    exit(1)

with open(env_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

for line in lines:
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    if "=" not in line:
        continue
    
    parts = line.split("=", 1)
    key = parts[0].strip()
    value = parts[1].strip()
    
    # Strip outer quotes if present
    if (value.startswith('"') and value.endswith('"')) or (value.startswith("'") and value.endswith("'")):
        value = value[1:-1]
    
    # Set production URL for NEXT_PUBLIC_APP_URL
    if key == "NEXT_PUBLIC_APP_URL":
        value = "https://vanyara-global-project.vercel.app"
    
    print(f"Adding env variable {key} to Vercel...")
    
    # Run vercel env rm first to clear old values
    subprocess.run(f'npx -y vercel env rm "{key}" production,preview,development -y', capture_output=True, text=True, shell=True)

    # Add via stdin
    cmd = f'npx -y vercel env add "{key}" production,preview,development'
    res = subprocess.run(cmd, input=value, capture_output=True, text=True, shell=True)
    if res.returncode != 0:
        print(f"Failed to add {key}: {res.stderr.strip() or res.stdout.strip()}")
    else:
        print(f"Successfully added {key}")

print("Done pushing env variables!")
