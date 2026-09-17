#!/usr/bin/env bash
# Build the static export locally and rsync it to us-2c2g.
# Requires SSH host "us-2c2g" in ~/.ssh/config.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root/web"
npm ci
npm run build
ssh us-2c2g "mkdir -p /root/blocktrellis/site"
tar czf - -C out . | ssh us-2c2g "tar xzf - -C /root/blocktrellis/site"
echo "uploaded to us-2c2g:/root/blocktrellis/site"
