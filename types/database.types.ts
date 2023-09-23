export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          tweet_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          tweet_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweets"
            referencedColumns: ["id"]
          }
        ]
      }
      hashtags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          tweet_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id?: string
          tweet_id: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweets"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tweet_hashtag: {
        Row: {
          hashtag_id: string
          tweet_id: string
        }
        Insert: {
          hashtag_id: string
          tweet_id: string
        }
        Update: {
          hashtag_id?: string
          tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tweet_hashtag_hashtag_id_fkey"
            columns: ["hashtag_id"]
            referencedRelation: "hashtags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tweet_hashtag_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweets"
            referencedColumns: ["id"]
          }
        ]
      }
      tweets: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          reply_to_id: string | null
          text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id?: string
          reply_to_id?: string | null
          text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          reply_to_id?: string | null
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tweets_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tweets_reply_to_id_fkey"
            columns: ["reply_to_id"]
            referencedRelation: "tweets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
