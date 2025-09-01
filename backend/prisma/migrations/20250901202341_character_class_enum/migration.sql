-- Safe migration: converter coluna string -> enum sem perder dados

-- 1) Criar enum se não existir
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CharacterClass') THEN
    CREATE TYPE "CharacterClass" AS ENUM ('ditt','jin','penril','phoy');
  END IF;
END$$;

-- 2) Validar valores existentes na coluna class
DO $$
DECLARE
  invalid_count int;
BEGIN
  SELECT COUNT(*) INTO invalid_count
  FROM "Character"
  WHERE "class" NOT IN ('ditt','jin','penril','phoy');

  IF invalid_count > 0 THEN
    RAISE EXCEPTION 'Existem % valores inválidos em Character.class. Corrija antes e rode a migração novamente. Valores válidos: ditt, jin, penril, phoy.', invalid_count;
  END IF;
END$$;

-- (Opcional: se quiser forçar correção automática em vez de abortar, descomente a linha abaixo e remova o bloco de validação acima)
-- UPDATE "Character" SET "class" = 'ditt' WHERE "class" NOT IN ('ditt','jin','penril','phoy');

-- 3) Alterar tipo da coluna usando cast (sem dropar)
ALTER TABLE "Character"
  ALTER COLUMN "class" TYPE "CharacterClass"
  USING ("class"::text::"CharacterClass");

-- 4) Garantir índice/unique em name (caso ainda não exista)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = current_schema()
      AND indexname = 'Character_name_key'
  ) THEN
    CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
  END IF;
END$$;