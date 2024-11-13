FROM node:20 AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install  --frozen-lockfile

RUN pnpm run build

FROM node:20

ENV TZ=Asia/Seoul
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

COPY docker-entrypoint.sh /app
COPY prisma ./prisma

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]