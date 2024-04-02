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
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* evento de resposta para dadas às notificações, ou seja, qunado o usuário interage(toca) na notificação */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      setDados(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMensagem = async () => {
    /* montar a mensagem que será enviada via sistema de notificações */
    const mensagem = {
      title: "Lembrete! 😃",
      body: "Não se esqueça de estudar muito...",
      data: {
        usuario: "Chapolin colorado",
        cidade: "São Paulo",
      },
    };

    /* Função de agendamento de notificações */
    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      //acionador/disparador de notificação
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Text>Exemplo de notificação local</Text>
        <Button title="Disparar notificação" onPress={enviarMensagem} />
        {dados && (
          <View>
            <Text>Usuário: {dados.usuario}</Text>
            <Text>Cidade: {dados.cidade}</Text>
          </View>
        )}
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
