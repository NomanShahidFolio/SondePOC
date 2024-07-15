import React, { useState } from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { getToken, getQuestionnaires } from "./api"; // Adjust the import based on your file structure

const App = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeVoice = async () => {
    setLoading(true);
    try {
      // Step 1: Authenticate
      const token = await getToken();
      const result = await getQuestionnaires(token);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error during voice analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Analyze Voice" onPress={handleAnalyzeVoice} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {analysisResult && (
        <Text style={{ marginTop: 20 }}>
          {JSON.stringify(analysisResult, null, 2)}
        </Text>
      )}
    </View>
  );
};

export default App;
