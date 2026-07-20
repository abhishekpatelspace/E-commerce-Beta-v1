const { execSync } = require('child_process');

try {
  console.log("Adding GMAIL_USER...");
  execSync('npx -y vercel env add GMAIL_USER production --value "abhishekpatelspacework@gmail.com" -y --force', { stdio: 'inherit' });
  console.log("Adding GMAIL_PASS...");
  execSync('npx -y vercel env add GMAIL_PASS production --value "ubbwqtjlxtzmymnn" -y --force', { stdio: 'inherit' });
  console.log("Done!");
} catch (e) {
  console.error("Error adding env vars:", e.message);
}
