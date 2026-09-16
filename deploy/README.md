# Deploy ChainForge on us-2c2g

us-2c2g already terminates HTTPS in the Aurora Caddy container (`aurora-web-1`, ports 80/443). ChainForge is a static export mounted into that Caddy — no extra Node process, which matters on a 2GB box.

Do not bind UDP 443; s-ui already owns it.

## One-time DNS (Cloudflare, gray cloud)

`chainforge.cn` is already on the same Cloudflare account as `minner.fun`. Add:

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

ssh us-2c2g "mkdir -p /root/chainforge/site"
tar czf - -C out . | ssh us-2c2g "tar xzf - -C /root/chainforge/site"
```

If Caddy already has the site block and volume, no compose restart is needed.

## First-time Caddy wiring (already done on the VPS)

1. Mount `/root/chainforge/site` into `aurora-web-1` as `/srv/chainforge` via `~/aurora/compose.override.yaml`.
2. Append the `chainforge.cn` site block to `~/aurora/Caddyfile`.
3. `cd ~/aurora && docker compose up -d`

Reload after Caddyfile-only edits:

```bash
docker exec aurora-web-1 caddy reload --config /etc/caddy/Caddyfile
```
