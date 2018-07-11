package br.com.cq.dominio.dto;

import java.util.List;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Data
public class RevisaoDTO {
	
	private String id;
	private List<QuestaoDTO> questoes;
	private Integer totalQuestoes;
	private Integer totalAcertos;
	private Integer totalErros;
	private Integer porcentagemAcertos;
	private Integer passo;
	private boolean concluido;
	@JsonFormat(pattern="dd/MM/yyyy")
	@JsonSerialize(using=DateTimeSerializer.class)
	private DateTime dataCriacao;

}
