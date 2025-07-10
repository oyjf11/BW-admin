// src/pages/Login.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-[80vw] flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Card className="w-full px-[10%] shadow-lg">
        <CardContent className="pt-6 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-center">后台登录</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => {
                window.location.href = "/dashboard"; // 这里用来跳转，后续可改用 react-router
              }, 1000);
            }}
            className="space-y-4"
          >
            <Input className="mb-[20px]" placeholder="用户名" required />
            <Input className="mb-[20px]" placeholder="密码" type="password" required />
            <Button className="w-full mt-2" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
