import { API } from "@/lib/api";

// サーバーコンポーネントでユーザープロフィールデータを取得するための関数
export const getProfileData = async (userId: string) => {
  try {
    // ユーザープロフィール情報を取得
    const user = await API.getUserProfile(userId);

    if (!user) {
      return {
        user: null,
        error: "ユーザーが見つかりませんでした",
      };
    }

    return { user, error: null };
  } catch (error) {
    console.error("プロフィールの取得に失敗しました:", error);
    return {
      user: null,
      error: "プロフィールの取得に失敗しました",
    };
  }
};

// サーバーコンポーネントでユーザーの鑑定ポイントを取得するための関数（キャッシュなし）
export const getProfileCheckPointsDataByUserId = async (userId: string) => {
  try {
    // ユーザーの鑑定ポイントを取得
    const checkPoints = await API.getUserCheckPoints(userId);

    return { checkPoints, error: null };
  } catch (error) {
    console.error("鑑定ポイントの取得に失敗しました:", error);
    return {
      checkPoints: [],
      error: "鑑定ポイントの取得に失敗しました",
    };
  }
};
