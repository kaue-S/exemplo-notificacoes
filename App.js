import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

//Manipulador de eventos de notificação
Notifications.setNotificationHandler({
  handleNotification: (async = () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  }),
});

export default function App() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    /* Verific */
    async function permissoesIos() {
      return Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
    }
    permissoesIos();

    /* o que fazer quando a notificação for recebida no app */
    Notifications.addNotificationReceivedListener((notifcacao) => {
      console.log(notifcacao);
    });

    /* evento de resposta para dadas às notificações, ou seja, qunado o usuário interage(toca) na notificação */
    Notifications.addNotificationReceivedListener((resposta) => {
      console.log(resposta);
    });
  }, []);

  const enviarMensagem = () => {
    /* montar a mensagem que será enviada via sistema de notificações */
    const mensagem = {};
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Exemplo de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMensagem} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
