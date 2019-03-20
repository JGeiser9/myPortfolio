# Compile first
npm run build

# Remove any old files in jakegeiser.com dir
ssh root@68.183.28.66 "rm -rf jakegeiser.com/*"

# Copy over files from build directory
scp -r build/ root@68.183.28.66:/root/jakegeiser.com/

# Restart Docker proxy
ssh root@68.183.28.66 "docker-compose restart"
