# ---------- base ----------
    FROM node:22-alpine AS base
    ENV PNPM_HOME="/pnpm" NODE_ENV=production
    ENV PATH="$PNPM_HOME:$PATH"
    RUN corepack enable
    WORKDIR /app
    
    # ---------- deps ----------
    FROM base AS deps
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm fetch
    RUN pnpm install --frozen-lockfile --prod=false
    
    # ---------- build ----------
    FROM deps AS build
    COPY . .
    # Wymagamy standalone; jeśli ktoś zapomni włączyć, przerwij build z czytelnym komunikatem
    RUN pnpm build && \
        node -e "const f=require('fs'); if(!f.existsSync('.next/standalone')){console.error('❌ Next build nie wygenerował .next/standalone. Ustaw output:\"standalone\" w next.config.'); process.exit(1)}" && \
        mkdir -p public
    
    # ---------- runner ----------
    FROM node:22-alpine AS runner
    ENV NODE_ENV=production
    WORKDIR /app
    
    RUN addgroup -S app && adduser -S app -G app
    USER app
    
    # Kopiujemy minimalne artefakty
    COPY --from=build /app/package.json ./
    COPY --from=build /app/.next/standalone ./
    COPY --from=build /app/.next/static ./.next/static
    COPY --from=build /app/public ./public
    
    EXPOSE 3000
    
    # (opcjonalnie) healthcheck – jeśli masz route health w Next
    # HEALTHCHECK --interval=30s --timeout=3s --start-period=15s \
    #   CMD wget -qO- http://localhost:3000 || exit 1
    
    CMD ["node", "server.js"]
    