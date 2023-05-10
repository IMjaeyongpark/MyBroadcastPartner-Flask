package DeBug.emotion.Controller;


import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@Slf4j
@CrossOrigin("*")
public class test {

    @RequestMapping("/test")
    public String Test(@RequestParam("BCID")String id) {

        String URI = "http://10.20.92.36:9900/z/"+id;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet request = new HttpGet(URI);
        request.addHeader("accept", "application/json");

        try {
            HttpResponse response = httpClient.execute(request);
            String jsonString = EntityUtils.toString(response.getEntity());
            JSONObject json = new JSONObject(jsonString);
            return "200";
        }catch (Exception e ){
            return "400";
        }
    }
    @RequestMapping("/test2")
    public String Test2(String json) {
        System.out.println(json);
        return "200";
    }

    @RequestMapping("/test3")
    public String Test3(@RequestParam("BCID")String id) {

        String URI = "http://localhost:9000/"+id;
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet request = new HttpGet(URI);
        request.addHeader("accept", "application/json");

        try {
            HttpResponse response = httpClient.execute(request);
            return "200";
        }catch (Exception e ){
            return "400";
        }
    }

    @GetMapping("/sse")
    public ResponseEntity<SseEmitter> handleSSE() {
        SseEmitter emitter = new SseEmitter();
        new Thread(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    emitter.send(SseEmitter.event().data("Data " + i));
                    Thread.sleep(1000);
                }
                emitter.complete();
            } catch (Exception ex) {
                emitter.completeWithError(ex);
            }
        }).start();
        return ResponseEntity.ok(emitter);
    }

    @GetMapping("/sse2")
    public ResponseEntity<SseEmitter> handleSSE2() {
        SseEmitter emitter = new SseEmitter();
        new Thread(() -> {
            try {
                boolean a = true;
                while (a) {
                    emitters.add(emitter);

                    emitter.onCompletion(() -> {
                        emitters.remove(emitter);
                    });
                    emitter.onTimeout(() -> emitters.remove(emitter));
                    System.out.println(emitter);
                    //emitter.send(SseEmitter.event().data("Data " + i));
                }
                emitter.complete();
            } catch (Exception ex) {
                emitter.completeWithError(ex);
            }
        }).start();
        return ResponseEntity.ok(emitter);
    }

    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream() throws IOException {
        SseEmitter emitter = new SseEmitter();

        // 플라스크에서 SSE로 데이터를 보내줄 endpoint 주소
        String endpoint = "http://localhost:5000/data";

        // 플라스크로부터 SSE를 통해 데이터를 받아와서 클라이언트에게 전송
        SseClient client = new SseClient(endpoint);
        client.subscribe(event -> {
            try {
                emitter.send(SseEmitter.event().data(event.getData()).id(event.getId()));
            } catch (IOException e) {
                emitter.complete();
            }
        });

        return emitter;
    }

    @PostMapping("/message")
    public void handleMessage(@RequestBody String message) {
        System.out.println("Received message: " + message);
        sendMessage(message);

    }

    public void sendMessage(String message) {
        emitters.forEach(emitter -> {
            try {
                emitter.send(message);
            } catch (IOException e) {
                emitter.complete();
                emitters.remove(emitter);
                e.printStackTrace();
            }
        });
    }
}
