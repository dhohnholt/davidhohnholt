-- =============================================================
--  BOOKINGS TABLE RLS POLICY RESET (SAFE / IDEMPOTENT)
-- =============================================================

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- ANON + AUTHENTICATED CAN INSERT
-- -------------------------------------------------------------

DROP POLICY IF EXISTS "Anon can submit bookings" ON public.bookings;
CREATE POLICY "Anon can submit bookings"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated can submit bookings" ON public.bookings;
CREATE POLICY "Authenticated can submit bookings"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (true);

-- -------------------------------------------------------------
-- ADMIN FULL ACCESS (SELECT/UPDATE/DELETE)
-- -------------------------------------------------------------

-- Admin SELECT
DROP POLICY IF EXISTS "Admin can read bookings" ON public.bookings;
CREATE POLICY "Admin can read bookings"
ON public.bookings
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Admin UPDATE
DROP POLICY IF EXISTS "Admin can update bookings" ON public.bookings;
CREATE POLICY "Admin can update bookings"
ON public.bookings
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Admin DELETE
DROP POLICY IF EXISTS "Admin can delete bookings" ON public.bookings;
CREATE POLICY "Admin can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Admin INSERT (optional but harmless)
DROP POLICY IF EXISTS "Admin can insert bookings" ON public.bookings;
CREATE POLICY "Admin can insert bookings"
ON public.bookings
FOR INSERT
TO authenticated
WITH CHECK (auth.jwt() ->> 'role' = 'admin');