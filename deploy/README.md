# Deploy BlockTrellis on us-2c2g

us-2c2g already terminates HTTPS in the Aurora Caddy container (`aurora-web-1`, ports 80/443). BlockTrellis is a static export mounted into that Caddy — no extra Node process, which matters on a 2GB box.

Do not bind UDP 443; s-ui already owns it.

> **chainforge.cn**: the old domain for this project. It's being handed off to a different, unrelated site, so its Caddy block, `/root/chainforge/site` and the mount into `aurora-web-1` are left alone on purpose — this repo no longer deploys to it. Don't reuse `deploy/caddy.chainforge.caddy`-shaped changes here; that domain isn't ours to manage anymore.

## One-time DNS (Cloudflare, gray cloud)

`blocktrellis.com` is already on the same Cloudflare account as `minner.fun`. Add:

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `104.168.34.97` | DNS only |
| A | `www` | `104.168.34.97` | DNS only |

Gray cloud (DNS only) so Caddy can complete Let's Encrypt HTTP-01, same as `aurora.minner.fun`.

## Publish a new build

From the repo root, on a machine that can SSH as `us-2c2g`:

```bash
cd web
npm ci
npm run build

ssh us-2c2g "mkdir -p /root/blocktrellis/site"
tar czf - -C out . | ssh us-2c2g "tar xzf - -C /root/blocktrellis/site"
```

If Caddy already has the site block and volume, no compose restart is needed.

## First-time Caddy wiring

1. Mount `/root/blocktrellis/site` into `aurora-web-1` as `/srv/blocktrellis` via `~/aurora/compose.override.yaml` (add a line next to the existing `chainforge` mount — don't remove that one).
2. Append the `blocktrellis.com` site block from `deploy/caddy.blocktrellis.caddy` to `~/aurora/Caddyfile`.
3. `cd ~/aurora && docker compose up -d` — this recreates the shared `web` container (new volume mount), which briefly interrupts every domain it serves (chainforge.cn, aurora.minner.fun, minner.fun, ipure.art/dev), not just this one. Coordinate before running it.

Reload after Caddyfile-only edits (no container recreate, no interruption to other domains):

```bash
docker exec aurora-web-1 caddy reload --config /etc/caddy/Caddyfile
```
