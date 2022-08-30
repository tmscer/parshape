FROM ubuntu

ARG USER_NAME=tex
ARG USER_HOME=/home/tex
ARG USER_ID=1000
ARG USER_GECOS=TeX
ARG DEBIAN_FRONTEND=noninteractive

RUN adduser \
  --home "$USER_HOME" \
  --uid $USER_ID \
  --gecos "$USER_GECOS" \
  --disabled-password \
  "$USER_NAME"

ARG WGET=wget
ARG GIT=git
ARG MAKE=make
ARG PANDOC=pandoc
ARG PCITEPROC=pandoc-citeproc
ARG PYGMENTS=python3-pygments
ARG FIG2DEV=fig2dev
ARG JRE=default-jre-headless

RUN apt-get update -y && apt-get install -y \
  texlive-full curl

RUN apt-get update -y && apt-get install -y \
  # some auxiliary tools
  "$WGET" \
  "$GIT" \
  "$MAKE" \
  # markup format conversion tool
  "$PANDOC" \
  "$PCITEPROC" \
  # XFig utilities
  "$FIG2DEV" \
  # syntax highlighting package
  "$PYGMENTS"

RUN rm -rf /var/lib/apt/lists && \
  # Removing documentation packages *after* installing them is kind of hacky,
  # but it only adds some overhead while building the image.
  apt-get --purge remove -y .\*-doc$ && \
  # Remove more unnecessary stuff
  apt-get clean -y
