--
-- PostgreSQL database dump
--

-- Dumped from database version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.10 (Ubuntu 14.10-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: have_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.have_tag (
    post_id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.have_tag OWNER TO postgres;

--
-- Name: gettags; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.gettags AS
 SELECT string_agg(have_tag.name, ','::text) AS tags,
    have_tag.post_id
   FROM public.have_tag
  GROUP BY have_tag.post_id;


ALTER TABLE public.gettags OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title text NOT NULL,
    banner text,
    content text DEFAULT ''::text,
    des text DEFAULT ''::text,
    author integer NOT NULL,
    is_draft boolean NOT NULL,
    publish_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: getposts; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.getposts AS
 SELECT p.id AS post_id,
    p.title,
    p.banner,
    p.content,
    p.des,
    p.author,
    p.is_draft,
    p.publish_time,
    g.tags,
    u.name AS author_name
   FROM ((public.posts p
     LEFT JOIN public.gettags g ON ((g.post_id = p.id)))
     LEFT JOIN public.users u ON ((u.id = p.author)));


ALTER TABLE public.getposts OWNER TO postgres;

--
-- Name: getpostswithpattern(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getpostswithpattern(pattern text) RETURNS SETOF public.getposts
    LANGUAGE plpgsql
    AS $$
BEGIN 
    RETURN QUERY
    SELECT * FROM getPosts g
    WHERE g.title ~* pattern;
END;
$$;


ALTER FUNCTION public.getpostswithpattern(pattern text) OWNER TO postgres;

--
-- Name: get_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.get_token (
    user_id integer NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.get_token OWNER TO postgres;

--
-- Data for Name: get_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.get_token (user_id, token) FROM stdin;
\.


--
-- Data for Name: have_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.have_tag (post_id, name) FROM stdin;
490612991	asd
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, banner, content, des, author, is_draft, publish_time) FROM stdin;
490612991	asb		asdas	asd	737358175	f	2024-01-12 22:28:04.848168
577324045	bbbac				737358175	f	2024-01-12 23:59:51.911749
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, password) FROM stdin;
737358175	kf	123
\.


--
-- Name: get_token get_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_token
    ADD CONSTRAINT get_token_pkey PRIMARY KEY (user_id, token);


--
-- Name: have_tag have_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.have_tag
    ADD CONSTRAINT have_tag_pkey PRIMARY KEY (name, post_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: get_token get_token_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.get_token
    ADD CONSTRAINT get_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_fkey FOREIGN KEY (author) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

