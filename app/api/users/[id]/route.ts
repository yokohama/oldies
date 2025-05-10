import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 通常のSupabaseクライアントを初期化（サービスロールキー不要）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json(
      { error: "ユーザーIDが必要です" },
      { status: 400 },
    );
  }

  try {
    // profilesテーブルからユーザー情報を取得
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url, email")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("プロフィール情報取得エラー:", profileError);
      return NextResponse.json(
        { error: "プロフィール情報の取得に失敗しました" },
        { status: 500 },
      );
    }

    if (!profileData) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 },
      );
    }

    // 必要な情報だけを返す
    return NextResponse.json({
      id: profileData.id,
      name: profileData.full_name || profileData.username || "ユーザー",
      email: profileData.email,
      avatarUrl:
        profileData.avatar_url ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`,
    });
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return NextResponse.json({ error: "内部サーバーエラー" }, { status: 500 });
  }
}
