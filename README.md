# Zola + Pico

My [Zola](https://www.getzola.org/) template based on [Pico CSS](https://picocss.com/)

## Features

- Semantic HTML (~no class needed)
- Lightweight (7 KB of CSS compressed)
- Responsive design
- Automatic light/dark theme
- Math support with [KaTeX](https://katex.org/)
- Dynamic table of contents

## Configuration

Most of the configuration is done in `zola.toml`, see [Zola documentation](https://www.getzola.org/documentation/getting-started/configuration/) for more information.

## Updating Pico CSS

```sh
pico_version=$(curl -s https://api.github.com/repos/picocss/pico/releases/latest | jq -r '.tag_name')
wget -O pico_src.tar.gz https://github.com/picocss/pico/archive/refs/tags/${pico_version}.tar.gz
tar -xf pico_src.tar.gz
mv pico pico_old
mv pico-*/scss pico
rm -rf pico-* pico_*
```
