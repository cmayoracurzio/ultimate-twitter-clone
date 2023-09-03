-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  full_name text,

  constraint username_length check (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


CREATE TABLE tweets (
  id UUID PRIMARY KEY,
  text text not null,
  profile_id UUID not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);


CREATE TABLE hashtags (
  id UUID PRIMARY KEY,
  name text not null
);

CREATE TABLE tweet_hashtag (
  tweet_id UUID not null,
  hashtag_id UUID not null, 
  PRIMARY KEY (tweet_id, hashtag_id),
  FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
  FOREIGN KEY (hashtag_id) REFERENCES hashtags(id) ON DELETE CASCADE
);


CREATE TABLE replies (
  id UUID PRIMARY KEY,
  text text not null,
  profile_id UUID not null,
  tweet_id UUID,
  reply_id UUID,
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE,
  FOREIGN KEY (reply_id) REFERENCES replies(id) ON DELETE CASCADE
);


CREATE TABLE likes (
  id UUID PRIMARY KEY,
  profile_id UUID not null,
  tweet_id UUID not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  CONSTRAINT like_unique UNIQUE (profile_id, tweet_id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
);

CREATE TABLE bookmarks (
  id UUID PRIMARY KEY,
  profile_id UUID,
  tweet_id UUID,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  CONSTRAINT bookmark_unique UNIQUE (profile_id, tweet_id),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
);