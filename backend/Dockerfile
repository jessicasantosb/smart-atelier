FROM rust:1.99.1-slim-bookworm

WORKDIR /workspace

RUN apt-get update \
    && apt-get install --no-install-recommends -y ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY Cargo.toml Cargo.lock ./
RUN cargo fetch --locked

EXPOSE 3000
CMD ["cargo", "run", "--locked"]
